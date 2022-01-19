<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2022-01-19 16:09:54
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 18:01:19
-->
<template>
  <ul class="comps">
    <li>
      <base-button size="large">Click Me</base-button>
    </li>
    <li>
      <base-button size="medium">Click Me</base-button>
    </li>
    <li>
      <base-button size="small">Click Me</base-button>
    </li>
    <li>
      <base-button plain size="large">Click Me</base-button>
    </li>
    <li>
      <base-button plain size="medium">Click Me</base-button>
    </li>
    <li>
      <base-button plain size="small">Click Me</base-button>
    </li>
    <li>
      <base-button size="small" loading>Click Me</base-button>
    </li>
    <li>
      <base-button type="error" size="small">Click Me</base-button>
    </li>
  </ul>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.comps {
  li {
    margin-bottom: 10px;
  }
}
</style>
