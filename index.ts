import * as fs  from 'fs';
import { exit } from 'process';
import * as readLineSync from 'readline-sync';

class TaskList //clase "lista de tareas, define el array y todos los metodos para operar su contenido"
{
    taskList : any[];

    constructor(taskList:any[]){this.taskList=taskList};
    
    addTask() //agrega una tarea al final del array
    {
        const task: string = readLineSync.question("¿Que tarea desea agregar?");
        this.taskList.push(task);
    }
    deleteTask() //pide una posicion, muestra la tarea en esta, pide confirmacion y borra la posicion
    {
        const position: number= parseInt(readLineSync.question("¿En que posición de la lista se encuentra la tarea a eliminar?"));

        if (position<=this.taskList.length && position>=0)
        { 
            const answer : boolean= readLineSync.question(`La tarea seleccionada es : ${this.taskList[position]} ¿Desea eliminarla? si/no`)==="si";

            if (answer){this.taskList.splice(position,1)};
        } 
        else {console.log("la posicion indicada no existe")};
    }
    modifyTask() //pide posicion, muestra contenido, pide nueva tarea, reemplaza la ubicacion
    {
        const position: number= parseInt(readLineSync.question("¿En que posición de la lista se encuentra la tarea a modificar?"));

        if (position<=this.taskList.length && position>=0)
        { 
            const answer : boolean= readLineSync.question(`La tarea seleccionada es : ${this.taskList[position]} ¿Desea modificarla? si/no`)==="si";

            if (answer){this.taskList[position]=readLineSync.question("Ingresa la tarea modificada")};
        } 
        else {console.log("la posicion indicada no existe")};
        
    }
    showAllTasks(){console.log(this.taskList)}; //muestra el array completo
} 

function main()
{
    const list= new TaskList(JSON.parse(fs.readFileSync('./lista.json').toString())); 
    //lee el archivo permanente

    let opcion: number;
    
    do //itera el menu e invoca los metodos solicitados
    {
       opcion=readLineSync.questionInt(`Elija una opción: \n1- Agregar tarea\n2- Borrar tarea\n3- Modificar tarea\n4- Mostrar lista\n5- Salir\n`);
       switch (opcion)
       { 
            case 1:
                list.addTask();
                break;
            case 2:
                list.deleteTask();
                break;
            case 3:
                list.modifyTask();
                break;
            case 4: 
                list.showAllTasks();
                break;
        }
    }
    while(opcion!=5)
    fs.writeFileSync('./lista.json', JSON.stringify(list.taskList));
    //guarda el archivo permanente

    exit(); //finaliza la ejecucuion
}
main();

//falta  arreglar el formato en que se muestra el texto y cubrir los posibles errores en timepo de ejecucion