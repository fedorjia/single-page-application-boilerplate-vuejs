<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="view"></router-view>
        </transition>

        <alert ref="alert"></alert>
        <confirm ref="confirm"></confirm>
    </div>
</template>

<script type="text/ecmascript-6">
    import Alert from './widgets/Alert.vue';
    import Confirm from './widgets/Confirm.vue';

    export default {
        data() {
            return {
                transitionName: 'fade'
            };
        },

        components: {
            Alert,
            Confirm
        },

        watch: {
            /**
             * watch router change and decide which transition will make
             */
            '$route'(to, from) {
                if (window.router.__state__ === 'push') {
                    // push
                    this.transitionName = to.meta.transition;
                } else {
                    // pop
                    const name = from.meta.transition;
                    let trName = 'fade'; // fade
                    switch (name) {
                        case 'slide-left': {
                            trName = 'slide-right';
                            break;
                        }
                        case 'slide-right': {
                            trName = 'slide-left';
                            break;
                        }
                    }
                    this.transitionName = trName;
                }
            }
        },

        mounted() {
            window.$refs.alert = this.$refs.alert;
            window.$refs.confirm = this.$refs.confirm;
        }
    };
</script>

<style lang="stylus">
    @import "../styles/app.styl";
</style>
