<template>
  <div id="app">
  	<nav-header></nav-header>
		<nav-bread></nav-bread>
  	<router-view/> 
  	<nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader"
	import NavFooter from "@/components/NavFooter"
	import NavBread from "@/components/NavBread"
	export default {
		name:"app",
		components:{
			NavHeader,
			NavFooter,
			NavBread
		}
	}
</script>

<style lang="scss">
	#app{
		width: 100%;
		background: #f5f7fc;
	}	
	.wrap{
		width: 1200px;
		margin:  0 auto;
	}
</style>
