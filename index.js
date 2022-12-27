const popupWrapper = document.querySelector(".popup-wrapper")
const buttonWhatsapp = document.querySelector(".button-whatsapp");
const buttonClosePopup = document.getElementById("button-close-popup");
const serviceInput = document.getElementById("service");
const periodInput = document.getElementById("period");
const dateInput = document.getElementById("date");
const buttonSubmit = document.querySelector(".button-submit");


class Form {
    constructor(service, period, date){
        this.resetStyle()
        try {
            if(service.value === ""){
                const error = new Error("Campo serviço vazio!");
                error.input = "service"
                throw error;
            }
            this.updateStyle("service", "sucess");
            if(period.value === ""){
                const error = new Error("Campo periodo vazio!");
                error.input = "period"
                throw error;
            }
            this.updateStyle("period", "sucess");
            if(date.value === ""){
                const error = new Error("Campo data vazio!");
                error.input = "date"
                throw error;
            }
            this.updateStyle("date", "sucess");
        }catch(error){
            this.updateStyle(error.input, "error");
            document.querySelector(`.${error.input}-error`).innerText = error.message;
        }
        this.service = service.value;
        this.period = period.value;
        this.date = date.value;
    }
    updateStyle(input, situation){
        document.getElementById(input).classList.add(situation);
    }
    resetStyle(){
        [service, period, date].forEach(el =>{
            el.classList.remove("sucess", "error");
        })
        document.querySelector(`.service-error`).innerText = "";
        document.querySelector(`.period-error`).innerText = "";
        document.querySelector(`.date-error`).innerText = "";
    }
    cleanForm(){
        service.value = "";
        period.value = "";
        date.value = ""
    }
}
buttonWhatsapp.addEventListener("click", (ev) =>{
    ev.preventDefault()
    popupWrapper.classList.add("active");
})
buttonClosePopup.addEventListener("click", (ev) =>{
    ev.preventDefault();
    popupWrapper.classList.remove("active");
})
buttonSubmit.addEventListener("click", (ev) =>{
    ev.preventDefault()
    const form = new Form(serviceInput, periodInput, dateInput);
    if(!Object.values(form).includes("")){
        sendMessage(form);
        form.cleanForm();
        form.resetStyle();
        popupWrapper.classList.remove("active");
    }
})


function sendMessage({service, period, date}){
    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const cel = +5511971493149;
    const text = window.encodeURIComponent("Olá, quero agendar um horário:" +
    "\n\nServiço: " + service +
    "\nData: " + date + " (" + dias[new Date(date).getDay()] + ")" +
    "\nPeriodo: " + period);
    window.open(`https://api.whatsapp.com/send?phone=${cel}&text=${text}`, `_blank`);
}