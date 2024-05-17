<template>
    <div id="inicio">
        <div class="col-md-12 container text-center">
            <span class="text-secondary">Sistema feito as pressas, qualquer bug porfavor relatar no whatsapp no rodapé da pagina</span>
        </div>

        <div class="col-md-12 gap-3 justify-content-center flex-wrap p-3">
            <div class="col shadow rounded d-flex justify-content-center align-items-center ">
                <img :src="require('@/assets/img/sos_rs.jpg')" alt="sosrs" class="img-inicio">
            </div>
        </div>

        <div class="col-md-12 mt-2">
            <div class="col-md-12 text-center mb-2 text-secondary">
                <h4>Parceiros</h4>
            </div>

            <div class="col-md-12 justify-content-center d-flex gap-3 mb-3 flex-wrap">
                <img :src="require('@/assets/img/psicoprontuarios.png')" alt="psico_prontuarios" style="width: 150px">
                <!-- <img :src="require('@/assets/img/znc.png')" alt="psico_prontuarios" style="width: 150px"> -->
            </div>
        </div>

        <div class="bg-dark d-flex flex-column text-light p-3 justify-content-center align-items-center footer">
            <div class="col-md-12">
                <div class="col-md-12 text-center mb-2">
                    Desenvolvido por <span class="fw-bold">Lucas Steinbach</span>
                </div>

                <div class="col-md-12 justify-content-center d-flex gap-3">
                    <i class="fa-brands fa-instagram" @click="instagram"></i>
                    <i class="fa-brands fa-whatsapp" @click="whatsapp"></i>
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
    },
    methods: {
        instagram() {
            window.open('https://www.instagram.com/lucassteinbach/', '_blank');
        },
        whatsapp() {
            window.open('https://wa.me/5534992021394', '_blank');
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

    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}

@media screen and (max-width: 500px) {
    .img-inicio {
        width: 300px        
    }

    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>