function init(){
    const initModal = new bootstrap.Modal(document.getElementById('initModal'), {
        keyboard: false
    })
    initModal.toggle()
}

init()