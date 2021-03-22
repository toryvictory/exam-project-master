const express = require('express');
const authRouter = require('./routes/auth');
const userController = require('./controllers/userController');
const creditCardController = require('./controllers/creditCardController');
const contestController = require('./controllers/contestController');
const chatController = require('./controllers/chatController');
const passwordController = require('./controllers/passwordController');
const offerController = require('./controllers/offerController');
const chatControllerPg = require('./controllers/chatControllerPg');
const chatCatalogControllerPg = require('./controllers/chatCatalogControllerPg');
const upload = require('./utils/fileUpload');
const permissions = require('./middlewares/permissions');
const chatPermissions = require('./middlewares/chatPermissions');
const checkAuthorization = require('./middlewares/checkAuthorization');
const checkRole = require('./middlewares/checkRole');
const parseBody = require('./middlewares/parseBody');
const validateBody = require('./middlewares/validateBody');
const { contestSchema, passwordResetSchema } = require('./validation/schemas');

const { CUSTOMER, CREATOR, MODERATOR } = require('./constants');

const router = express.Router();

router.use('/auth', authRouter);

router.post('/resetPassword', validateBody(passwordResetSchema), passwordController.resetPassword);

router.post('/confirmPasswordReset', passwordController.confirmPasswordReset);

router.use(checkAuthorization);

router.patch('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post('/dataForContest', contestController.dataForContest);

router.post(
  '/pay',
  checkRole([CUSTOMER]),
  upload.uploadContestFiles,
  parseBody,
  validateBody(contestSchema),
  creditCardController.payment,
);

router.post('/getCustomersContests', contestController.getCustomersContests);

router.get(
  '/getContestById',
  permissions.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  checkRole([CREATOR]),
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
  permissions.canSendOffer,
  offerController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  permissions.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus,
);

router.post(
  '/changeMark',
  checkRole([CUSTOMER]),
  offerController.changeMark,
);

router.post(
  '/cashout',
  checkRole([CREATOR]),
  creditCardController.cashout,
);

router.post('/newMessage', chatControllerPg.addMessage);

router.post('/getChat', chatControllerPg.getChat);

router.post('/getPreview', chatControllerPg.getPreview);

router.post('/blackList', chatControllerPg.blackList);

router.post('/favorite', chatControllerPg.favoriteChat);

router.post(
  '/createCatalog',
  chatPermissions.participatesInChat,
  chatCatalogControllerPg.createCatalog,
);

router.post('/updateNameCatalog', chatCatalogControllerPg.updateNameCatalog);

router.post(
  '/addNewChatToCatalog',
  chatPermissions.participatesInChat,
  chatPermissions.ownsCatalog,
  chatCatalogControllerPg.addNewChatToCatalog,
);

router.post(
  '/removeChatFromCatalog',
  chatPermissions.participatesInChat,
  chatPermissions.ownsCatalog,
  chatCatalogControllerPg.removeChatFromCatalog,
);

router.post(
  '/deleteCatalog',
  chatController.deleteCatalog,
);

router.post('/getCatalogs', chatCatalogControllerPg.getCatalogs);

router.get('/getOffers', checkRole([MODERATOR]), offerController.getOffers);

router.patch('/changeOfferModerationStatus',
  checkRole([MODERATOR]),
  offerController.changeOfferModerationStatus,
  offerController.sendOfferModerationEmail);

module.exports = router;
