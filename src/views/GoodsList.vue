<template>
	<div class="goodslist">	
		<div class="wrap">
			<div class="goodslist-nav">
				<div class="sort">
					<span href="javascript:;">Sort by:</span>
					<a href="javascript:;" :class="{active:priceSort==0}" @click="onPriceSort(0)">Default</a>
					<a href="javascript:;" :class="{active:priceSort!=0}" @click="onPriceSort(1)">Price <i class="iconfont" :class="Priceiconfont"></i></a>
				</div>
			</div>
			<div class="price-interval">
				<h3>PRICE:</h3>
				<p :class="{intervalActive:priceInterval=='all'}" @click="onPriceInterval('all')">All</p>
				<p :class="{intervalActive:priceInterval=='0'}" @click="onPriceInterval('0')">0.00-100.00</p>
				<p :class="{intervalActive:priceInterval=='1'}" @click="onPriceInterval('1')">100.00-500.00</p>
				<p :class="{intervalActive:priceInterval=='2'}" @click="onPriceInterval('2')">500.00-1000.00</p>
				<p :class="{intervalActive:priceInterval=='3'}" @click="onPriceInterval('3')">1000.00-5000.00</p>
			</div>
			<div class="proudct-list">
				<mu-card class="proudct-listitem" v-for="(item,index) in proudctList">
					<mu-card-media >
						<img :src="item.productImage" />
					</mu-card-media>
					<mu-card-text>
						<h3>{{item.productName}}</h3>
						<p><span class="salePrice">￥{{item.salePrice.toFixed(2)}}</span><span class="orginPrice">{{item.orginPrice.toFixed(2)}}</span></p>
					</mu-card-text>
				</mu-card>	
			</div>
			<div class="paging">
				<div class="pagingwrap">
					<mu-pagination :total="total" :current="page" @pageChange="handleClick" :defaultPageSize='pageSize' v-if='paginationshow'>
  					</mu-pagination>
				</div>				
			</div>
			
		</div>	
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				paginationshow:false,
				total:0,
				current:2,
				proudctList:[],
				priceSort:0,
				priceInterval:'all',
				page:1,
				pageSize:3,
			}
		},
		computed:{
			//判断排序切换箭头
			Priceiconfont(){
				if(this.priceSort==-1){
					return "icon-xiangxiajiantoucuxiao" 
				}else{
					return "icon-xiangshangjiantoucuxiao" 
				}
			}
		},
		mounted(){
			this._getproudctList();
		},
		methods:{
			//首次渲染事件
			_getproudctList(){
				axios.get('/goods/list',{
					params:{
						priceLevel:this.priceInterval,
						priceSort:this.priceSort,
						page:this.page,
						pageSize:this.pageSize
					}
				}).then((res)=>{
					this.total=res.data.total;
					this.paginationshow=true;
					this.proudctList=res.data.data;
				})
			},
			//切换价格排序事件
			onPriceSort(sortstatus){
				this.page=1;
				if(sortstatus==0){
					this.priceSort=0;
				}else{
					if(this.priceSort==0){
						this.priceSort=1;
					}else{
						this.priceSort=-1*this.priceSort;
					}					
				}
				this._getproudctList();
			},
			//切换价格区间事件
			onPriceInterval(interval){
				this.page=1;
				this.priceInterval=interval;
				this._getproudctList();
			},
			//分页事件
			handleClick(newIndex){
				this.page=newIndex;
				this._getproudctList();
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.goodslist{
		width: 100%;
		overflow: hidden;
		.goodslist-nav{
			height: 50px;
			background: #fff;
			margin: 50px 0;
			.sort{
				float: right;
				line-height: 50px;
				a{
					color: #333333;
					margin-right:10px; 
					&:hover{
						color: red;
					}
				}
				.active{
					color: red;
				}
				
			}
		}
		.price-interval{
			width: 200px;
			float: left;
			padding-left: 20px;
			p{
				line-height: 30px;
				cursor: pointer;
				padding:0 10px; 
				&:hover{
					color: #FF0000;
					transform: scale(1.05);
					transition: all 0.5s; 
					border-left: 2px solid #FF0000;
				}
			}
			.intervalActive{
				color: #FF0000;
				border-left: 2px solid #FF0000;
			}
		}
		.proudct-list{
			float: left;
			width: 1000px;
			.proudct-listitem{
				float: left;
				width: 240px;
				margin: 5px;
				cursor: pointer;
				&:hover{
					transform: scale(1.1);
					transition: all 0.5s; 
					position: relative;
					z-index: 10;
				}
				img{
					width: 240px;
					height: 240px;
				}
				.salePrice{
					color: red;
					font-weight: bold;
					margin: 0 10px;
					font-size: 18px;
				}
				.orginPrice{
					text-decoration: line-through;
				}
			}
		}
		.paging{
			float: left;
			width: 100%;
			text-align: center;
			.pagingwrap{
				display: inline-block;
			}
		}
		
	}
	
</style>