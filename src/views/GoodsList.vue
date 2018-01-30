<template>
	<div class="goodslist">	
		<div class="wrap">
			<div class="goodslist-nav">
				<div class="sort">
					<span href="javascript:;">Sort by:</span>
					<a href="javascript:;" class="active">Default</a>
					<a href="javascript:;">Price <i class="iconfont icon-xiangshangjiantoucuxiao"></i></a>
				</div>
			</div>
			<div class="price-interval">
				<h3>PRICE:</h3>
				<p class="interval-active">All</p>
				<p>0.00-100.00</p>
				<p>100.00-500.00</p>
				<p>500.00-1000.00</p>
				<p>1000.00-5000.00</p>
			</div>
			<div class="proudct-list">
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
				<mu-card class="proudct-listitem">
					<mu-card-media >
						<img src="../../build/logo.png" />
					</mu-card-media>
					<mu-card-text>
						我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
				</mu-card>
					
			</div>
		</div>	
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		components:{
			
		},
		mounted(){
			this._getproudctList();
		},
		methods:{
			_getproudctList(){
				axios.get('/goods/list').then((res)=>{
					console.log(res.data);
				})
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
					transform: scale(1.1);
					transition: all 0.5s; 
					border-left: 2px solid #FF0000;
				}
			}
			.interval-active{
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
			}
		}
		
	}
	
</style>