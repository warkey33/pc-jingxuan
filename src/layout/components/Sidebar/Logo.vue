<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="logo">
        <h1 v-else class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? variables.sidebarTitle : variables.sidebarLightTitle }">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="logo">
        <h1 class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? variables.sidebarTitle : variables.sidebarLightTitle }">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    }
  },
  data() {
    return {
      title: '精选',
      logo: logoImg
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 0.6s ease;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  background: #0B1220;
  text-align: left;
  overflow: hidden;
  padding: 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    & .sidebar-logo {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-right: 10px;
      border-radius: 8px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 500;
      line-height: 56px;
      font-size: 18px;
      font-family: "ZCOOL XiaoWei", "Noto Serif SC", serif;
      letter-spacing: 0.12em;
      vertical-align: middle;
    }
  }

  &.collapse {
    padding: 0;
    text-align: center;

    .sidebar-logo-link {
      justify-content: center;
    }

    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
