import { Router } from "express";
const router = new Router();
import servicesControllers from "../controllers/services.controllers.js";
import { upload } from "../middleware/upload.js";

// создание новой услуги
// router.post('/createService/:id', servicesControllers.createService);
router.post('/createService/:id', upload.single('image') , servicesControllers.createService);
// http://localhost:5000/api/getServices

router.put('/updatePhoto/:id', upload.single('image'), servicesControllers.updateServicePhoto)

// поиск услуг по поисковому запросу
router.post('/getServices', servicesControllers.getServices);
// http://localhost:5000/api/getServices

// получение услуги по id
router.get('/service/:id', servicesControllers.getOneService);
// http://localhost:5000/api/service/${id}

// обновление услуги по id
router.put('/updateService/:id', servicesControllers.updateService);


// // удаление услуги по id
// router.delete('/deleteService/:id', servicesControllers.deleteService);

// получение услуг специалиста по id
router.get('/getServicesSpecialist/:id', servicesControllers.getServiceSpecialist);
// http://localhost:5000/api/getServicesSpecialist/${id}


// получение избранных услуг пользователя по id
router.get('/getServicesFavorite/:id', servicesControllers.getServiceFavorites);


// добавление в избранное
router.post('/addFavorites', servicesControllers.addFavorites)

export default router