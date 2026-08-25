<template>
  <div class="home">
    <section class="home-hero">
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">JingXuan Workspace</p>
        <h1 class="home-hero__title">精选管理系统</h1>
        <p class="home-hero__desc">
          聚焦采购、领料、投料与质检协同，把制造现场的关键动作收拢到同一工作台。
        </p>
      </div>
      <div class="home-hero__orb" aria-hidden="true" />
    </section>

    <section class="home-grid">
      <article
        v-for="item in highlights"
        :key="item.title"
        class="home-tile"
      >
        <div class="home-tile__icon" :style="{ background: item.tone }">
          <i :class="item.icon" />
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      highlights: [
        {
          title: "采购协同",
          desc: "采购单、物料清单与交货信息统一追踪，减少跨部门来回确认。",
          icon: "el-icon-s-order",
          tone: "linear-gradient(135deg, #1A66FF, #4C8DFF)"
        },
        {
          title: "生产执行",
          desc: "领料、投料、入库与工序统计串联，现场进度更清晰。",
          icon: "el-icon-s-cooperation",
          tone: "linear-gradient(135deg, #0F766E, #15B8A6)"
        },
        {
          title: "质量闭环",
          desc: "面料、绣花与瓶检等检验单据集中管理，异常更快定位。",
          icon: "el-icon-s-claim",
          tone: "linear-gradient(135deg, #B54708, #FDB022)"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.home {
  padding: 20px 24px 32px;
  min-height: calc(100vh - 84px);
  background: transparent;
}

.home-hero {
  position: relative;
  overflow: hidden;
  padding: 36px 40px;
  border-radius: 16px;
  color: #fff;
  background:
    radial-gradient(circle at 85% 20%, rgba(76, 141, 255, 0.45), transparent 40%),
    linear-gradient(135deg, #0B1220 0%, #152447 55%, #1A66FF 140%);
  animation: home-rise 0.55s ease-out both;

  &__content {
    position: relative;
    z-index: 1;
    max-width: 640px;
  }

  &__eyebrow {
    margin: 0 0 10px;
    font-family: "Sora", "PingFang SC", sans-serif;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  &__title {
    margin: 0;
    font-family: "ZCOOL XiaoWei", "Noto Serif SC", serif;
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 0.06em;
  }

  &__desc {
    margin: 14px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.82);
    max-width: 520px;
  }

  &__orb {
    position: absolute;
    right: -40px;
    top: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    animation: orb-pulse 6s ease-in-out infinite;
  }
}

.home-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.home-tile {
  padding: 22px 20px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #E4E7EC;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: home-rise 0.55s ease-out both;

  &:nth-child(2) { animation-delay: 0.08s; }
  &:nth-child(3) { animation-delay: 0.16s; }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  }

  &__icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    margin-bottom: 14px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #0B1220;
  }

  p {
    margin: 8px 0 0;
    font-size: 13px;
    line-height: 1.7;
    color: #667085;
  }
}

@keyframes home-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes orb-pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.08); opacity: 1; }
}

@media (max-width: 960px) {
  .home-grid {
    grid-template-columns: 1fr;
  }

  .home-hero {
    padding: 28px 22px;

    &__title {
      font-size: 32px;
    }
  }
}
</style>
