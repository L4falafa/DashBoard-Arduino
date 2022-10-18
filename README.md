# DashBoard-Arduino
School Project

Dashboard for sensors.

Api on NodeJs to send data to a frontend on react.
 

```diff
Rutas:
- objects/
  add (post) [nombre_objeto]
  remove (post) [id]
  update (post) [id, nombre_objeto]
  get (get) [id]
  getAll (get)
  getPanelFromObject (get) [id]
! getPanelFromObject devuelve un json con array sensores y la id del objeto, la array tiene todos los sensores del objeto, cada sensor tiene su el ultimo dato 
! Campos devueltos por getPanelFromObject: sensores.id, sensores.nombre_sensor, sensores.tipo_dato, sensores.piso, last_data.dato, last_data.fecha

- sensors/
  add (post) [nombre_sensor, tipo_dato, id_objeto, piso]
  remove (post) [id]
  update (post) [id, nombre_sensor, tipo_dato, id_objeto, piso]
  get (get) [id]
  getAll (get)
- data_sensors/
  add (post) [id_sensor, dato]
  get (get) [id]
  getFromSensor (get) [id]
  getAll (get)
          
```