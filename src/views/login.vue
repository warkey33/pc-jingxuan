<template>
  <div class="login">
    <div class="login-hero" aria-hidden="true">
      <div class="login-hero__glow login-hero__glow--a" />
      <div class="login-hero__glow login-hero__glow--b" />
      <div class="login-hero__grid" />
      <div class="login-hero__copy">
        <p class="login-hero__eyebrow">JingXuan MES</p>
        <h1 class="login-hero__brand">精选</h1>
        <p class="login-hero__desc">制造执行与供应链协同管理平台</p>
      </div>
    </div>

    <div class="login-panel">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="login-form__header">
          <h2 class="title">欢迎回来</h2>
          <p class="subtitle">登录精选管理系统以继续工作</p>
        </div>

        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="login-code-row">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              class="login-code-input"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code" title="点击刷新验证码">
              <img v-if="codeUrl" :src="codeUrl" class="login-code-img" alt="验证码" @click="getCode">
              <span v-else class="login-code-placeholder" @click="getCode">点击获取</span>
            </div>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" class="login-remember">记住密码</el-checkbox>
        <el-form-item class="login-submit">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            class="login-submit__btn"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <p class="el-login-footer">Copyright © 2021-{{ year }} 精选 JingXuan</p>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      year: new Date().getFullYear(),
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      }).catch(() => {
        this.codeUrl = "";
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm.username = username || this.loginForm.username;
      this.loginForm.password = password ? decrypt(password) : this.loginForm.password;
      this.loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe);
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            this.getCode();
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  min-height: 100%;
  background: #070D18;
  overflow: hidden;
}

.login-hero {
  position: relative;
  flex: 1.2;
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(7, 13, 24, 0.55), rgba(11, 18, 32, 0.75)),
    url("../assets/images/login-background.jpg") center / cover no-repeat;
  color: #fff;
  overflow: hidden;
  animation: login-hero-in 0.9s ease-out both;

  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;

    &--a {
      width: 420px;
      height: 420px;
      top: -80px;
      left: -60px;
      background: rgba(26, 102, 255, 0.45);
      animation: glow-float 8s ease-in-out infinite;
    }

    &--b {
      width: 360px;
      height: 360px;
      right: -40px;
      bottom: 10%;
      background: rgba(21, 184, 166, 0.28);
      animation: glow-float 10s ease-in-out infinite reverse;
    }
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 30% 40%, #000 20%, transparent 75%);
    opacity: 0.55;
  }

  &__copy {
    position: absolute;
    left: 10%;
    bottom: 18%;
    z-index: 1;
    max-width: 520px;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-family: "Sora", "PingFang SC", sans-serif;
    font-size: 13px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }

  &__brand {
    margin: 0;
    font-family: "ZCOOL XiaoWei", "Noto Serif SC", serif;
    font-size: clamp(64px, 8vw, 96px);
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.08em;
    text-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  }

  &__desc {
    margin: 18px 0 0;
    font-family: "Sora", "PingFang SC", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
    max-width: 360px;
  }
}

.login-panel {
  position: relative;
  flex: 0 0 min(460px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 40px 32px;
  background: #fff;
  animation: login-panel-in 0.7s 0.15s ease-out both;
}

.login-form {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  &__header {
    margin-bottom: 28px;
  }

  .title {
    margin: 0;
    font-family: "Sora", "PingFang SC", sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #0B1220;
  }

  .subtitle {
    margin: 8px 0 0;
    font-size: 14px;
    color: #667085;
  }

  .el-input {
    height: 44px;

    input {
      height: 44px;
      border-radius: 10px;
    }
  }

  .input-icon {
    height: 44px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-code-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-code-input {
  flex: 1;
}

.login-code {
  flex: 0 0 118px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #E4E7EC;
  background: #F5F7FB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.login-code-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-code-placeholder {
  font-size: 12px;
  color: #667085;
}

.login-remember {
  margin: 0 0 18px;
}

.login-submit {
  width: 100%;
  margin-bottom: 0;

  &__btn {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
}

.el-login-footer {
  margin: 36px auto 0;
  text-align: center;
  color: #98A2B3;
  font-size: 12px;
  letter-spacing: 0.02em;
}

@keyframes login-hero-in {
  from {
    opacity: 0;
    transform: translateX(-18px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes login-panel-in {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(24px); }
}

@media (max-width: 900px) {
  .login {
    flex-direction: column;
  }

  .login-hero {
    min-height: 36vh;
    flex: none;

    &__copy {
      left: 24px;
      right: 24px;
      bottom: 24px;
    }

    &__brand {
      font-size: 48px;
    }
  }

  .login-panel {
    flex: 1;
    padding: 32px 24px;
  }
}
</style>
