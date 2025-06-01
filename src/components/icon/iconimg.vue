<script>
export default {
  name:'',
  props:{
    url:'',
    classtxt:''
  }
}</script>
<template>
    <span :class="classtxt" 
    :style="`mask-image: url(${url});`"></span>
</template>