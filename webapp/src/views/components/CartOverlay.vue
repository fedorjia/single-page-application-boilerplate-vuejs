<template>
    <div class="cart-overlay" @click="onClick">
        <div class="inner">
            <i class="iconfont icon-cart"/>
            <div class="badge">{{ count }}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import cartStore from '../../commons/cart-store';

    export default {
        data() {
            return {
                count: 0
            };
        },

        beforeDestroy () {

        },

        methods: {
            refresh() {
                this.count = cartStore.count();
                if(this.count > 9) {
                    this.count = '9+';
                }
            },

            onClick() {
                window.router.push('/cart');
            }
        }
    };
</script>
