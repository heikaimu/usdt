<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2022-01-19 17:19:07
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 18:08:09
-->
<template>
  <div
    class="base-button"
    :class="[type, { plain: plain, loading: loading }]"
    :style="cardStyle"
  >
    <p v-if="loading" class="loading"><i class="el-icon-loading" /></p>
    <p v-else class="button__text">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    type: {
      type: String,
      default: 'primary'
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    cardStyle() {
      if (this.size === 'small') {
        return {
          height: '40px',
          fontSize: '16px',
          padding: '0 30px',
          borderRadius: '20px'
        };
      } else if (this.size === 'large') {
        return {
          height: '60px',
          fontSize: '20px',
          padding: '0 40px',
          borderRadius: '30px'
        };
      } else {
        return {
          height: '43px',
          fontSize: '16px',
          padding: '0 20px',
          borderRadius: '22px'
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-block;
  position: relative;
  transition: 1s;
  cursor: pointer;

  &.primary {
    background: transparent linear-gradient(90deg, #36a2ea 0%, #dfa1e5 100%);
    box-shadow: 5px 5px 10px #00000029;
  }
  .button__text {
    @include flex-row-center;
    width: 100%;
    height: 100%;
    color: #ffffff;
  }

  .loading {
    @include flex-row-center;
    width: 100%;
    height: 100%;
    .el-icon-loading {
      color: #ffffff;
    }
  }

  &.primary {
    &:hover {
      background: transparent linear-gradient(90deg, #36a2ea 0%, #36a2ea 100%);
    }
    &.loading {
      cursor: default;
      &:hover {
        background: transparent linear-gradient(90deg, #36a2ea 0%, #dfa1e5 100%);
      }
    }

    &.plain {
      border: 2px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0.8)
        ),
        linear-gradient(90deg, #36a2ea, #dfa1e5);
      .button__text {
        color: $title-color;
      }
      &:hover {
        background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.8)
          ),
          linear-gradient(90deg, #36a2ea, #36a2ea);
      }
    }
  }

  &.error {
    border: 2px solid $error-color;
    .button__text {
      color: $error-color;
    }
  }
}
</style>
