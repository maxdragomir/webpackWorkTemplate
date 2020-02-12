<template>
	<VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHandle">
		<img src="https://raw.githubusercontent.com/lecion/vue-perfect-scrollbar/master/example/assets/azusa.jpg" height="720" width="1280" alt="">
	</VuePerfectScrollbar>
</template>

<script>
    // import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            VuePerfectScrollbar
        },
        name: 'app',
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        methods: {
            scrollHandle(evt) {
                console.log(evt)
            }
        }
    }

</script>
<style lang="scss">
	.scroll-area {
		position: relative;
		margin: auto;
		width: 400px;
		height: 300px;
	}
</style>