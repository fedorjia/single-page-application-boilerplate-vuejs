<template>
    <div class="home-view">
        <infinite ref="infinite" url="/api/list" :limit=10 :on-load-success="onLoadSuccess"
                  :on-load-failure="onLoadFailure">
            <div slot="content">
                <ul class="content">
                    <li v-for="item in items">
                        <div class="thumbnail cover" :style="{backgroundImage:'url('+item.thumbnail+')'}"></div>
                        <div class="name">{{ item.title }}</div>

                        <div class="footer-box">
                            <div class="price">
                                <span class="unit">$</span>
                                <span class="text">{{ item.price }}</span>
                            </div>
                            <div class="options">
                                <div class="option iconfont icon-reduce" @click="onReduce(item)"></div>
                                <div class="option iconfont icon-add" style="margin-top: 4px;" @click="onAdd(item)"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </infinite>

        <cart-overlay ref="cartOverlay"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex';
    import {home} from '../store/types';
    import Infinite from './widgets/Infinite.vue';
    import CartOverlay from './components/CartOverlay.vue';
    import cartStore from '../commons/cart-store';

    export default {
        components: {
            Infinite,
            CartOverlay
        },

        mounted() {
            if(this.items.length === 0) {
                // load data
                this.$refs.infinite.refresh();
            }

            this.$refs.cartOverlay.refresh();
        },

        beforeDestroy() {

        },

        computed: {
            ...mapState({
                error: ({home}) => home.error,
                isLoading: ({home}) => home.isLoading,
                items: ({home}) => home.items
            })
        },

        watch: {
            error(v) {
                if(v) {
                    window.$refs.alert.show(v.message);
                }
            }
        },

        methods: {
            onLoadSuccess(data) {
                this.$store.commit(home.DATA_RECEIVED, data);
            },

            onLoadFailure(data) {
                this.$store.commit(home.DATA_ERROR, data);
            },

            onReduce(item) {
                cartStore.decrease(item);
                this.$refs.cartOverlay.refresh();
            },

            onAdd(item) {
                cartStore.increase(item);
                this.$refs.cartOverlay.refresh();
            }
        }
    };
</script>
