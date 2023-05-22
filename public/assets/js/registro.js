new Vue({
    el:".divlogin",
    data:{
        
        form:{type:0,// 0 = Login , 1 = Registro , 2 = Recuperar password
            email:"",
            password:"",
            password2:""}
    },
    methods:{
            sendForm(){
                if(this.ValidaType()){
                console.log(this.form);
                }
            },
            ValidaType(){
                if(this.form.type==0 && !this.Valida_email && !this.Valida_password){
                    return true;
                }
                else if(this.form.type==1 && !this.Valida_email && !this.Valida_confirmar_password){
                    return true;
                }
                else if(this.form.type==2 && !this.Valida_email){
                    return true;
                }
                return false;
            }
    },
    computed:{
        Valida_email(){
            var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;//Expreion regular la cual pide que tenga @ y un dominio
            if (exp.test(this.form.email)){
                
                return false;
             }
            else{
                
                return true;
            }
        },
        Valida_password(){
            var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;//Expresion regular que pide que la contraseña tenga mayuscula, minuscula y un numero
            if (exp.test(this.form.password)){
                
                return false;
             }
            else{
                return true;
            }
        },
        Valida_confirmar_password(){
            if(this.form.password==this.form.password2){
                return false;
            }
            else{
                return true;
            }
        },
        title(){
            return (this.form.type==0)?'Login':(this.form.type==1)?'Registro':'Recuperar password';
        }

    }
});