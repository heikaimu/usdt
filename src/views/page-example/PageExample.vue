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
      <el-divider content-position="left">按钮</el-divider>
      <el-button type="primary" round size="large">Click Me</el-button>
      <el-button type="primary" round size="large" plain>Click Me</el-button>
      <el-button type="primary" round size="large" loading>Loading</el-button>
      <el-button type="primary" round size="medium">Click Me</el-button>
      <el-button type="primary" round size="medium" plain>Click Me</el-button>
      <el-button type="primary" round size="small">Click Me</el-button>
      <el-button type="danger" round size="large" plain>Error</el-button>
    </li>
    <li>
      <el-divider content-position="left">圆形按钮</el-divider>
      <el-button circle><icon-arrow-right></icon-arrow-right></el-button>
    </li>
    <li>
      <el-divider content-position="left">图标</el-divider>
      <icon-arrow-right></icon-arrow-right>
      <el-divider direction="vertical"></el-divider>
      <icon-filter></icon-filter>
      <el-divider direction="vertical"></el-divider>
      <icon-close></icon-close>
      <el-divider direction="vertical"></el-divider>
      <icon-upload></icon-upload>
      <el-divider direction="vertical"></el-divider>
      <icon-delete></icon-delete>
    </li>
    <li>
      <el-divider content-position="left">分割线</el-divider>
      <el-divider></el-divider>
      <span class="divider-line"></span>
    </li>
    <li>
      <el-divider content-position="left">下拉框</el-divider>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </li>
    <li>
      <el-divider content-position="left">Input field</el-divider>
      <input-field></input-field>
    </li>
    <li>
      <el-divider content-position="left">Input</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="name" placeholder="Please enter name"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input v-model="name1" placeholder="Please enter name"></el-input>
        </el-col>
      </el-row>
    </li>
    <li>
      <el-divider content-position="left">Search</el-divider>
      <el-input
        v-model="keyword"
        placeholder="Search"
        prefix-icon="el-icon-search"
      ></el-input>
    </li>
    <li>
      <el-divider content-position="left">Other</el-divider>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button round>Load more <i class="el-icon-loading"></i></el-button>
        </el-col>
        <el-col :span="3">
          <el-switch
            style="display: block"
            v-model="switchTrue"
            active-color="#13ce66"
            inactive-color="#BABABA"
          >
          </el-switch>
        </el-col>
        <el-col :span="3">
          <el-switch
            style="display: block"
            v-model="switchFalse"
            active-color="#13ce66"
            inactive-color="#BABABA"
          >
          </el-switch>
        </el-col>
        <el-col :span="6">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-col>
        <el-col :span="6">
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </el-col>
      </el-row>
    </li>
    <li>
      <el-divider content-position="left">Other</el-divider>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </li>
    <li>
      <el-divider content-position="left">进度条</el-divider>
      <el-progress
        :text-inside="false"
        :stroke-width="16"
        :percentage="70"
        color="#ffffff"
      ></el-progress>
    </li>
    <li>
      <el-divider content-position="left">标签</el-divider>
      <el-tag type="primary" effect="dark" size="medium">标签</el-tag>
      <el-tag type="info" effect="dark" size="medium">标签</el-tag>
    </li>
    <li>
      <el-divider content-position="left">提示</el-divider>
      <el-button plain @click="open1"> 成功 </el-button>
      <el-button plain @click="open2"> 警告 </el-button>
      <el-button plain @click="open3"> 消息 </el-button>
      <el-button plain @click="open4"> 错误 </el-button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      name: "",
      keyword: "",
      switchTrue: true,
      switchFalse: false,
      checked: true,
      num: 1,
      name1: "中国共产党",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    open1() {
      this.$notify({
        title: "成功",
        duration: 0,
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },

    open2() {
      this.$notify({
        title: "警告",
        duration: 0,
        message: "这是一条警告的提示消息",
        type: "warning",
      });
    },

    open3() {
      this.$notify.info({
        title: "消息",
        duration: 0,
        message: "这是一条消息的提示消息",
      });
    },

    open4() {
      this.$notify.error({
        title: "错误",
        duration: 0,
        message: "这是一条错误的提示消息",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.comps {
  padding: 20px;
  li {
    margin-bottom: 10px;
  }
}
</style>
