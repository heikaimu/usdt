<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-07-01 13:57:55
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 16:26:06
-->
<template>
  <div class="web-container">
    <div class="header-container">
      <web-header />
    </div>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import WebHeader from './Header.vue';
export default {
  components: {
    WebHeader
  }
};
</script>

<style lang="scss" scoped>
.web-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header-container {
    height: 85px;
  }
  .content-container {
    flex: 1;
    background: #cccccc;
  }
}
</style>
