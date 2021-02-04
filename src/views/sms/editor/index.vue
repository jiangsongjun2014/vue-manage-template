<template>
	<div class="app-container">
		<quillEditor v-model="content" :options="editorOption" class="editor" ref="myQuillEditor"></quillEditor>
		<el-button type="primary" size="small" @click="handleConfirm">保存</el-button>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor';
	import {toolbarOptions} from "@/utils/quill.js";
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import Quill from "quill";
	import ImageResize from "quill-image-resize-module";
	Quill.register("modules/imageResize", ImageResize); 
	
	export default {
		data(){
			return {
				content: '',
				editorOption: {
					placeholder: "请输入正文",
					modules: {
						toolbar: toolbarOptions,
						imageResize: {
							displayStyles: {
								backgroundColor: "black",
								border: "none",
								color: "white"
							},
							modules: ["Resize", "DisplaySize", "Toolbar"]
						},
					},
				}
			}
		},
		components:{
			quillEditor
		},
		methods:{
			// 保存
			handleConfirm(){
				console.log(content)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.editor{
		line-height: normal !important;
		height: 500px;
		margin-bottom: 80px;
	}
</style>
