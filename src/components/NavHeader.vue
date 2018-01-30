<template>
	<div class="navheader">
		<div class="wrap">
			<div class="logo">
				<img src="../../build/logo.png"/>
			</div>	
			<div class="user">	
				<span class="iconfont icon-yonghu"></span>
				<span class="iconfont icon-gouwuche"></span>
			</div>			
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped lang="scss">
	.navheader{
		width: 100%;
		height: 60px;
		background: white;		
		.logo{
			float: left;
			width: 60px;
			height: 60px;
		}
		img{
			width: 100%;
			height: 100%;
		}
		.user{
			float: right;
			height: 60px;
			span{
				font-size: 30px;
				margin: 0 5px;
				line-height: 60px;
				cursor: pointer;
				&:hover{
					color: red;
				}
			}
		}
	}
</style>