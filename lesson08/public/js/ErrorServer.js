"use strict";

/**
 * Компонент: С сообщением об ошибке (в модальном окне), при запросе к серверу
 */
const ErrorServer = {
    //
    methods: {
        /**
         * Метод закрывает модальное окно
         */
        onClose($event) {
            this.$emit('close-modal', $event);
        },
    },

    //
    template: (
        `<div class="error-modal" id="error-modal">
            <div class="error-modal-backdrop">
                <!--
                <button class="error-modal-close">Закрыть</button>
                -->
            </div>
            <div class="error-modal-body">
                <button class="error-modal-close" v-on:click="onClose($event)">Закрыть</button>
                <div class="error-modal-wrap">
                    <h2>Ошибка при запросе к серверу</h2>
                </div>
            </div>
        </div>`
    )
}

//*******************************************************************

export {
    ErrorServer
}