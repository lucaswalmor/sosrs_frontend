<template>
    <div id="inicio">
        <div class="col-md-12 gap-3 justify-content-center flex-wrap p-3">
            <div class="col shadow rounded d-flex justify-content-center align-items-center ">
                <img :src="require('@/assets/img/sos_rs.jpg')" alt="sosrs" class="img-inicio">
            </div>
            <!-- <div class="col sobre-container shadow rounded d-flex justify-content-center align-items-center">
                Somos uma iniciativa afim de restaurar a união de pets perdidos nas enchentes do RS com seus famíliares
            </div> -->
        </div>

        <div class="col-md-12 mt-2">
            <div class="col-md-12 text-center mb-2 text-secondary">
                <h4>Parceiros</h4>
            </div>

            <div class="col-md-12 justify-content-center d-flex gap-3 mb-3">
                <img :src="require('@/assets/img/psicoprontuarios.png')" alt="psico_prontuarios" style="width: 150px">
                <img :src="require('@/assets/img/znc.jpg')" alt="psico_prontuarios" style="width: 150px">
            </div>
        </div>

        <div class="bg-dark d-flex flex-column text-light p-3 justify-content-center align-items-center">
            <div class="col-md-12">
                <div class="col-md-12 text-center mb-2">
                    Desenvolvido por <span class="fw-bold">Lucas Steinbach</span>
                </div>

                <div class="col-md-12 justify-content-center d-flex gap-3">
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-whatsapp"></i>
                </div>
            </div>
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