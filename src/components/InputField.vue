<template>
  <el-input type="text" v-model="value">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</template>

<script>
export default {
  name: "InputField",
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>