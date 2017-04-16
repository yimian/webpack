<template>
  <section class="db">
    <template v-if="!$route.meta.hidden">
      <template>
        <!-- header start  -->
        <header class="db-header">
          <router-link class="logo" :to="{path: '/'}"><img src="./assets/logo.png" alt="logo"></router-link>
          <div class="user-info">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                \{{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="db-dropdown">
                <el-dropdown-item><i class="icon-exit el-icon--left"></i>\{{ $t('common.logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </header>
        <!-- header end  -->

        <!-- body start  -->
        <div class="db-body">

          <!-- menu start -->
          <aside class="db-menu-wrapper">
            <el-menu :default-active="activeMenu" theme="dark" class="db-menu-bar" router>
              <template v-for="(route, index) in $router.options.routes[3].children">
                <el-submenu v-if="!route.meta.hidden && roleShow(route)" :index="route.name">
                  <template slot="title"><i :class="route.iconClass"></i>\{{ generatei18n(route.name) }}</template>
                  <template v-for="(cRoute, index) in route.children">
                    <el-menu-item
                      v-if="roleShow(cRoute)"
                      :index="cRoute.name"
                      :route="cRoute"
                      :class="{'is-actived': cRoute.name === activeMenu}">\{{ generatei18n(route.name, cRoute.name) }}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </aside>
          <!-- menu end -->

          <!-- content start -->
          <div class="db-content-wrapper">
            <section class="db-content">
              <router-view></router-view>
            </section>
          </div>
          <!-- content end -->

          <!-- footer start -->

          <!-- footer end -->
        </div>
        <!-- body end  -->
      </template>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        currentLang: localStorage.getItem('EAGLEWOOD_LANGUAGE') || 'en',
      };
    },
    computed: {
      activeMenu() {
        return this.$route.name;
      },
      user() {
        return {
          username: 'admin',
        };
        // return this.$auth.user();
      },
    },
    mounted() {
    },
    methods: {
      generatei18n(route, cRoute) {
        const cRouteName = cRoute || route;
        return this.$t(`${route}_nest.${cRouteName}`);
      },
      clickInfo() {
        this.$router.push({ name: 'info' });
      },
      logout() {
        this.$http.post('/api/auth/logout').then((res) => {
          if (res.body.ok) {
            this.$auth.logout();
          }
        });
      },
      switchLang(lang) {
        localStorage.setItem('EAGLEWOOD_LANGUAGE', lang);
        this.currentLang = lang;
        this.$locale.change(lang);
      },
      roleShow(route) {
        return route.meta.auth.indexOf(this.user.role) !== -1;
      },
    },
  };
</script>

<style lang="scss">
  @import './styles/_variables.scss';
  .db {
    .el-dropdown-menu {
      margin-top: 28px;
    }
    // header
    .db-header {
      width: 100%;
      height: 60px;
      background: #222426;
      padding: 13px 20px;
      box-sizing: border-box;
      color: #ffffff;
      z-index: 99;
      position: fixed;
      left: 0;
      top: 0;
      .logo{
        font-size: 2.4rem;
        img {
          height: 32px;
        }
      }
      .user-info {
        float: right;
        margin-top: 8px;
        img {
          width: 25px;
          height: 25px;
          vertical-align: -7px;
          margin: 0 0 0 10px;
          cursor: pointer;
        }
        .switch-lang {
          display: inline;
          margin-left: 20px;
          color: #999;
          span {
            cursor: pointer;
          }
        }
        .el-dropdown {
          color: #fff;
          cursor: pointer;
        }
        .active-lang {
          border-bottom: 1px solid white;
          padding-bottom: 5px;
        }
      }
    }

    // body
    .db-body {
      position: absolute;
      height: 100%;
      width: 100%;
      // menu
      .db-menu-wrapper {
        position: fixed;
        left: 0;
        top: 60px;
        background: rgb(238, 241, 246);
        height: 100%;
        overflow: auto;
        z-index: 98;
        .db-menu-bar {
          height: 100%;
          flex-grow: 0;
          width: 200px;
          .is-active {
            color: rgb(72, 87, 106);
          }
          .is-actived {
            color: #fff;
            background:#b32824;
          }
        }
      }
      // content
      .db-content-wrapper {
        width: 100%;
        height: 100%;
        z-index: 97;
        box-sizing: border-box;
        padding: 60px 0px 0px 200px;
        .db-content {
          min-height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 20px 25px 50px;
          overflow: auto;
          .db-content-inner {
            padding: 30px 0px;
          }
        }
      }
    }
  }

  //db-footer
  .db-footer{
    margin-top: -36px;
    position: relative;
    .main {
      text-align: center;
      font-size: 12px;
      color: #b2b9bf;

      span {
        margin: 0 5px;

        .el-button {
          font-size: 12px;
          color: #8a9199;
        }
        .el-button:hover {
          color: #de2319;
        }
      }
    }
  }

  //db-dropdown
  .db-dropdown {
    background: #34393e;
    border: #34393e;
    color: #fff;
    min-width: 160px;

    li {
      font-size: 14px;
      padding: 0 20px;

      .el-icon--left{
        margin-right: 10px;
      }
    }
  }
</style>
