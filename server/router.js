const express = require('express');
const basicMiddlewares = require('./middlewares/basicMiddlewares');
const userController = require('./controllers/userController');
const creditCardController = require('./controllers/creditCardController');
const contestController = require('./controllers/contestController');
const chatController = require('./controllers/chatController');
const offerController = require('./controllers/offerController');
const upload = require('./utils/fileUpload');
const authRouter = require('./routes/auth');
const checkAuthorization = require('./middlewares/checkAuthorization');
const validateBody = require('./middlewares/validateBody');
const { contestSchema, passwordResetSchema } = require('./validation/schemas');
const passwordController = require('./controllers/passwordController');

const router = express.Router();

router.use('/auth', authRouter);

router.post('/resetPassword', validateBody(passwordResetSchema), passwordController.resetPassword);

router.post('/confirmPasswordReset', passwordController.confirmPasswordReset);

router.use(checkAuthorization);

router.patch('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post('/dataForContest', contestController.dataForContest);

router.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validateBody(contestSchema),
  creditCardController.payment,
);

router.post('/getCustomersContests', contestController.getCustomersContests);

router.get(
  '/getContestById',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offerController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus,
);

router.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  offerController.changeMark,
);

router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  creditCardController.cashout,
);

router.post('/newMessage', chatController.addMessage);

router.post('/getChat', chatController.getChat);

router.post('/getPreview', chatController.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post(
  '/deleteCatalog',

  chatController.deleteCatalog,
);

router.post('/getCatalogs', chatController.getCatalogs);

router.get('/getOffers', offerController.getOffers);

router.patch('/changeOfferModerationStatus', offerController.changeOfferModerationStatus);

module.exports = router;
