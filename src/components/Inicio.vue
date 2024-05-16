<template>
    <div id="inicio">
        <div class="row gap-3 justify-content-center flex-wrap p-3">
            <div class="col shadow rounded d-flex justify-content-center align-items-center ">
                <img :src="require('@/assets/img/sos_rs.jpg')" alt="sosrs" class="img-inicio">
            </div>
            <!-- <div class="col sobre-container shadow rounded d-flex justify-content-center align-items-center">
                Somos uma iniciativa afim de restaurar a união de pets perdidos nas enchentes do RS com seus famíliares
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    }
}
</script>

<style>
.sobre-container {
    background-color: #D7DBDF;
    height: 500px;
}

@media screen and (max-width: 768px) {
    .img-inicio {
        width: 700px        
    }
}

@media screen and (max-width: 500px) {
    .img-inicio {
        width: 300px        
    }
}
</style>