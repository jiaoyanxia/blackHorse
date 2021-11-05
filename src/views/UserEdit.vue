<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userProfile.photo"
            @click="$refs.fileRef.click()"
          />
          <!-- 文件选择框 -->
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            v-show="false"
            ref="fileRef"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userProfile.name"
        @click="onNameCellClick"
      />
      <van-cell
        title="生日"
        is-link
        :value="userProfile.birthday"
        @click="onBirthCellClick"
      />
      <van-dialog
        v-model="showBirthSheet"
        title="修改生日"
        :showConfirmButton="false"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthSheet = false"
          @confirm="updateBirthday"
        />
      </van-dialog>
    </van-cell-group>

    <!-- 修改用户名称的对话框 -->
    <van-dialog
      v-model="showNameDialog"
      title="修改名称"
      show-cancel-button
      :before-close="beforeClose"
    >
      <!-- input-align === 文本横向对齐方式 -->
      <van-field
        v-model.trim="name"
        placeholder="请输入用户名"
        input-align="center"
        maxlength="7"
        ref="nameRef"
      />
    </van-dialog>
  </div>
</template>

<script>
import { updateUserProfileAPI, updateUserAvatarAPI } from "@/api/userAPI.js";
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";
export default {
  name: "UserEdit",
  data() {
    return {
      // 姓名对话框开关
      showNameDialog: false,
      // 是否展示修改生日的对话框
      showBirthSheet: false,
      // 用户填写的姓名
      name: "",

      // 最小可选日期（0 表示 1月份）
      minDate: new Date(1900, 0, 1),
      // 最大可选日期（11 表示 12月份）
      maxDate: new Date(2050, 11, 31),
      // 当前日期
      currentDate: new Date(),
    };
  },
  methods: {
    ...mapActions(["initUserProfile"]),
    // 点击修改名称的 cell
    onNameCellClick() {
      // 把用户的名称赋值给 data 中的 name
      this.name = this.userProfile.name;
      // 展示对话框
      this.showNameDialog = true;

      // ！！ DOm更新完后 使用nextTick让文本框自动获得焦点
      this.$nextTick(() => {
        this.$refs.nameRef.focus();
      });
    },
    // Dialog 关闭前的处理函数
    beforeClose(action, done) {
      // action 的值为 cancel 或 confirm
      console.log(action);
      //调用 done() 时会关闭对话框
      // 调用 done(false) 时会阻止对话框关闭

      // 如果点击取消, 则关闭对话框
      if (action === "cancel") return done();
      // 判断名称的长度符不符合规格
      if (this.name === "" || this.name.length > 7) {
        // 1. 提示用户“名称的长度为1-7个字符”
        this.$notify({
          type: "warning",
          message: "名称的长度为1-7个字符",
          duration: 2000,
        });
        // 2. 让文本框持续获得焦点
        this.$refs.nameRef.focus();
        // 3. 阻止对话框关闭
        return done(false);
      }

      this.updateName(done);
    },
    // 更新名称信息
    async updateName(done) {
      try {
        const { data: res } = await updateUserProfileAPI({ name: this.name });
        if (res.message === "OK") {
          // 1.关闭对话框
          done();
          // 2.重新请求用户的简介信息
          this.initUserProfile();
          // 3.提示用户更新成功
          this.$notify({
            type: "success",
            message: "名称更新成功！",
            duration: 2000,
          });
        }
      } catch {
        if (e.response.status === 409) {
          // 提示用户名称被占用
          this.$notify({
            type: "warning",
            message: "名称被占用，请更换后重试！",
            duration: 2000,
          });
          // 阻止关闭对话框
          done(false);
          // 让文本框持续获得焦点
          this.$refs.nameRef.focus();
        } else {
          // 关闭对话框
          done();
          // 提示用户名称被占用
          this.$notify({
            type: "danger",
            message: "名称更新失败！",
            duration: 2000,
          });
        }
      }
    },
    // 点击了修改生日的 cell
    onBirthCellClick() {
      this.showBirthSheet = true;
      this.currentDate = new Date(this.userProfile.birthday);
    },
    // 更新生日信息
    async updateBirthday(value) {
      this.showBirthSheet = false;
      const formateDate = dayjs(value).format("YYYY-MM-DD");

      const { data: res } = await updateUserProfileAPI({
        birthday: formateDate,
      });
      if (res.message === "OK") {
        this.initUserProfile();
        // 提示用户更新成功
        this.$notify({
          type: "success",
          message: "生日更新成功！",
          duration: 2000,
        });
      }
    },
    // 选中的文件
    async onFileChange(e) {
      // 获取到用户选择的文件列表
      const files = e.currentTarget.files;
      // 如果没有选择任何文件 则不执行后续的业务逻辑
      if (files.length === 0) return;

      console.log(files[0]);
      // 1.创建 FormData 的对象
      const fd = new FormData();
      // 2.向 fd 中追加数据项
      fd.append("photo", files[0]);
      // 3.调用 API 接口，更新头像
      const { data: res } = await updateUserAvatarAPI(fd);
      if (res.message === "OK") {
        this.initUserProfile();
        this.$notify({
          type: "success",
          message: "更新头像成功！",
          duration: 2000,
        });
      }
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  created() {
    this.initUserProfile();
  },
};
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>