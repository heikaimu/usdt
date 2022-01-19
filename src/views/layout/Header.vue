<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2022-01-19 15:48:43
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 17:00:28
-->
<template>
  <div class="web-header">
    <div class="web-header__content">
      <!-- logo -->
      <div class="web-header__logo">Cyber Rare</div>

      <!-- menus -->
      <div class="web-header__menu">
        <nav class="menu__list">
          <a
            v-for="(item, index) in navs"
            :key="index"
            :href="item.value"
            class="menu__item text"
          >{{ item.label }}</a>
        </nav>
      </div>

      <!-- user-station -->
      <div class="web-header__user-station">
        <!-- user info -->
        <div class="station-item user-info">
          <div class="avatar">
            <img
              src="https://avatars.githubusercontent.com/u/20633425?s=40&v=4"
              alt=""
            >
          </div>
          <p class="account">0x10fawdr3dadwfwafwaddwa</p>
        </div>

        <!-- notice -->
        <div class="station-item notice">
          <p class="text">通知</p>
        </div>

        <!-- login -->
        <div class="station-item login-wrapper">
          <p class="text">登出</p>
        </div>

        <!-- i18n -->
        <div class="station-item i18n">
          <p class="text">English</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          label: '首页',
          value: ''
        },
        {
          label: '市场',
          value: ''
        },
        {
          label: '盲盒',
          value: ''
        },
        {
          label: '发布',
          value: ''
        },
        {
          label: '收藏',
          value: ''
        },
        {
          label: '记录',
          value: ''
        },
        {
          label: '帮助',
          value: ''
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.web-header {
  height: 100%;
}
.web-header__content {
  @include flex-row-sb;
  height: 100%;
  box-sizing: border-box;
  max-width: 1430px;
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
  .text {
    font-size: $font-size-m;
    color: $title-color;
  }
}
.web-header__menu {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  .menu__list {
    @include flex-row-center;
    .menu__item {
      padding: 0 20px;
      text-decoration: none;
      font-weight: 600;
      margin: 0 10px;
    }
  }
}

.web-header__user-station {
  @include flex-row-center;
  .station-item {
    padding-left: 10px;
  }
  .user-info {
    @include flex-row-center;
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .account {
      padding-left: 10px;
      font-size: $font-size-s;
      color: $title-color;
    }
  }
}
</style>
