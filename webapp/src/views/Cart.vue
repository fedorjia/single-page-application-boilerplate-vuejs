<template>
    <div class="cart-view">
        <div class="wrapper">
        	<div class="title-bar">
        		<i class="iconfont icon-back" @click="onBack"/>
        		<div class="title">Shopping Cart</div>
        	</div>
        	<div class="user-box">
        		<div class="avatar" style="background-image: url(/static/icons/avatar.jpg);"></div>
        		<div class="name">Fedor.Jia</div>
        	</div>

    		<ul class="items" v-show="productAmount > 0">
                <li v-for="item in items">
                    <div class="inner">
                        <div class="thumbnail" :style="{backgroundImage: 'url('+item.thumbnail+')'}"></div>
                        <div class="info">
                            <div class="name">{{ item.title }}</div>
                            <div class="action">
                                <div class="price">
                                    <span class="unit">$</span>
                                    <span class="text">{{ item.price }}</span>
                                </div>
                                <div class="options">
                                    <div class="option iconfont icon-reduce" @click="onReduce(item)"></div>
                                    <div class="total">x <span>{{ item.count }}</span></div>
                                    <div class="option iconfont icon-add" style="margin-top: 6px;" @click="onAdd(item)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

    		<ul class="amount-box" v-show="productAmount > 0">
    			<li>
    				<div class="label">Product Amount</div>
    				<div class="value product-amount">$ {{ productAmount }}</div>
    			</li>
    			<li>
    				<div class="label">Freight</div>
    				<div class="value">$ {{ freight }}</div>
    			</li>
    		</ul>

            <div class="empty-tip" v-show="productAmount === 0">Nothing ...</div>
        </div>

        <div class="footer-box" v-show="productAmount > 0">
        	<div class="total-amount">Total Amount: $ <span>{{ amount }}</span></div>
        	<div class="btn-buy" @click="onPay">Pay</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex';
    import {cart} from '../store/types';

    export default {
        mounted() {
            this.$store.commit(cart.LOAD_DATA);
        },

        beforeDestroy() {

        },

        computed: {
            ...mapState({
                items: ({cart}) => cart.items
            }),

            productAmount() {
                let productAmount = 0;
                for(let item of this.items) {
                    productAmount += item.count * item.price;
                }
                return productAmount;
            },

            freight() {
                return 5;
            },

            amount() {
                return this.productAmount + this.freight;
            }
        },

        watch: {

        },

        methods: {
            onBack() {
                this.$router.go(-1);
            },

            onReduce(item) {
                this.$store.dispatch(cart.REDUCE_PRODUCT, item);
            },

            onAdd(item) {
                this.$store.dispatch(cart.ADD_PRODUCT, item);
            },

            onPay() {
                // window.$refs.alert.show('this is alert');
                window.$refs.confirm.show('Pay', {
                    content: 'Pay for this shopping, Are you sure?',
                    onSelect: (index) => {
                        // console.log(index);
                    }
                });
            }
        }
    };
</script>
