var exports = module.exports = {};
var connection = require('./connection.js');

var productCategory = require('./ProductCategory.js');
var searchWord = require('./SearchWord');
var searchWordException = require('./SearchWordException');
var reservedPhrases = require('./ReservedPhrases');
var trademark = require('./Trademark');
var telegramMerchantUser = require('./TelegramMerchantUser')
var legalEntity = require('./LegalEntities');
var baseTerminals = require('./BaseTerminals');
var trademarkSearchWord = require('./TrademarkSearchWord');
var productRegion = require('./ProductRegion');
var productRegionSearchWord = require('./ProductRegionSearchWord');
var ParsedEdrpou = require('./ParsedEdrpou');
var TelegramWatchdogUser = require('./TelegramWatchdogUser');
var AuditLogs = require('./AuditLogs');
var MtprotoPhones = require('./MtprotoPhones')
const KeyboardImage = require('./KeyboardImage');
const KeyboardVersion = require('./KeyboardVersion');
const IpayFrogAdmin = require('./IpayFrogAdmin');
const KeyboardSettings = require('./KeyboardSettings');
const KeyboardFeedback = require('./KeyboardFeedback');
const KeyboardSender = require('./KeyboardSender')
const KeyboardPaymentShow = require('./KeyboardPaymentShow')
const KeyboardDevice = require('./KeyboardDevice');
const Mcc = require('./Mcc')

var TelegramClient = require('./TelegramClient')
var TelegramPaymentBody = require('./TelegramPaymentBody')

var KeyboardPaymentBody = require('./KeyboardPaymentBody')
var KeyboardUser = require('./KeyboardUser')
var KeyboardMerchant = require('./KeyboardMerchant')

var merchant = require('./Merchant');
var cityTranslate = require('./CityTranslate');
var tradePoint = require('./TradePoint');
var brandContact = require('./BrandContact');
var duplicateTradePoint = require('./DuplicateTradePoint');
var tradePointWorkTime = require('./TradePointWorkTime');
var fiscalNumber = require('./FiscalNumber');
var phone = require('./Phone');
var photo = require('./Photo'),
admin = require('./Admin'),
couchUser = require('./CouchUser'),
brandRules = require('./BrandRules'),
brand = require('./Brand'),
city = require('./City'),
region = require('./Region'),
staticContent = require('./StaticContent'),
bank = require('./Bank'),
acquirer_bank = require('./AcquirerBanks'),
acquirer_banks_phone = require('./AcquirerBankPhone'),
mcc_code = require('./MccCode'),
place_photo = require('./PlacePhoto'),
place_phone = require('./PlacePhone'),
place = require('./Place'),
address_translate = require('./AddressTranslate'),
street_translate = require('./StreetTranslate'),
placeWorkTime = require('./PlaceWorkTime'),
bundle = require('./Bundle'),
taxgovToken = require('./TaxgovToken'),
taxgovRequest = require('./TaxgovRequest'),

TmpBaseMcCheck = require('./TmpBaseMcCheck');
var telegramMerchant = require('./TelegramMerchant');
var telegramUser = require('./TelegramUser');
var telegramUserHistory = require('./TelegramUserHistory');
var telegramTradePoint = require('./TelegramTradePoint');
var telegramBundle = require('./TelegramBundle');
var xmlMerchant = require('./XmlMerchant');
var telegramDonatsMerchant = require('./TelegramDonatsMerchant');
var ts_city = require('./TSCity');
var ts_tp = require('./TSTp');
var telegramChekUser = require('./TelegramChekUser');
var TelegramUserCheck = require('./TelegramUserCheck');
var OrdersToParseTaxgov = require('./OrdersToParseTaxgov');
var ActivityType = require('./ActivityType');
var MerchantActivityType = require('./MerchantActivityType');

var TelegramTransaction = require('./TelegramTransaction');
var ViberUser = require('./ViberUser');
var BotHelp = require('./BotHelp');
var BotSupport = require('./BotSupport');
var BotStatistics = require('./BotStatistics');
var KeyboardP2pPaymentBody = require('./KeyboardP2pPaymentBody')
const FrogAdmin = require('./FrogAdmin')
const KeyboardP2pPayoutBody = require('./KeyboardP2pPayoutBody')
const KeyboardP2pPayoutLogs = require('./KeyboardP2pPayoutLogs')
const MerchantMcc = require('./MerchantMcc')
const KeyboardFeedbackEmail = require('./KeyboardFeedbackEmail')


KeyboardDevice.KeyboardDevice.belongsToMany(KeyboardUser.KeyboardUser, {
  through: 'keyboard_user_device',
  as: 'users',
  foreignKey: 'device_id',
  otherKey: 'user_id'
});

KeyboardUser.KeyboardUser.belongsToMany(KeyboardDevice.KeyboardDevice, {
  through: 'keyboard_user_device',
  as: 'devices',
  foreignKey: 'user_id',
  otherKey: 'device_id'
});

KeyboardMerchant.KeyboardMerchant.belongsTo(KeyboardUser.KeyboardUser, {foreignKey: 'user_id', as: "user"});
KeyboardUser.KeyboardUser.hasMany(KeyboardMerchant.KeyboardMerchant, {foreignKey: 'user_id', as: "merchants"});

KeyboardPaymentBody.KeyboardPaymentBody.belongsTo(KeyboardUser.KeyboardUser, {foreignKey: 'user_id', as: "user"});
KeyboardUser.KeyboardUser.hasMany(KeyboardPaymentBody.KeyboardPaymentBody, {foreignKey: 'user_id', as: "payments"});


KeyboardPaymentBody.KeyboardPaymentBody.belongsTo(KeyboardMerchant.KeyboardMerchant, {foreignKey: 'merchant_id', as: "merchant"});
KeyboardMerchant.KeyboardMerchant.hasMany(KeyboardPaymentBody.KeyboardPaymentBody, {foreignKey: 'merchant_id', as: "payments"});

MerchantMcc.MerchantMcc.belongsTo(KeyboardMerchant.KeyboardMerchant, {foreignKey: 'merchant_id', as: "merchant"});
KeyboardMerchant.KeyboardMerchant.hasMany(MerchantMcc.MerchantMcc, {foreignKey: 'merchant_id', as: "allowed_mccs"});

MerchantMcc.MerchantMcc.belongsTo(Mcc.Mcc, {foreignKey: 'mcc_id', as: "mcc"});
Mcc.Mcc.hasMany(MerchantMcc.MerchantMcc, {foreignKey: 'mcc_id', as: "allowed_mccs"});

telegramBundle.TelegramBundle.belongsTo(telegramTradePoint.TelegramTradePoint, {foreignKey: '_trade_point_id', as: "bundle_telegram_trade_point"});
telegramTradePoint.TelegramTradePoint.hasMany(telegramBundle.TelegramBundle, {foreignKey: '_trade_point_id', as: "telegram_trade_point_bundles"});

TelegramPaymentBody.TelegramPaymentBody.belongsTo(telegramMerchant.TelegramMerchant, {foreignKey: 'telegram_merchant_id', as: "telegram_merchant"});
telegramMerchant.TelegramMerchant.hasMany(TelegramPaymentBody.TelegramPaymentBody, {foreignKey: 'telegram_merchant_id', as: "telegram_payments"});


telegramBundle.TelegramBundle.belongsTo(telegramMerchant.TelegramMerchant, {foreignKey: '_merchant_id', as: "bundle_telegram_merchant"});
telegramMerchant.TelegramMerchant.hasMany(telegramBundle.TelegramBundle, {foreignKey: '_merchant_id', as: "telegram_merchant_bundles"});

telegramTradePoint.TelegramTradePoint.belongsTo(telegramMerchant.TelegramMerchant, {foreignKey: 'merchant_id', as: "telegram_merchant"});
telegramMerchant.TelegramMerchant.hasMany(telegramTradePoint.TelegramTradePoint, {foreignKey: 'merchant_id', as: "telegram_trade_points"});

tradePointWorkTime.TradePointWorkTime.belongsTo(tradePoint.TradePoint, {foreignKey: '_trade_point_id', as: "wt_trade_point"});
tradePoint.TradePoint.hasMany(tradePointWorkTime.TradePointWorkTime, {foreignKey: '_trade_point_id', as: "work_time"});

photo.Photo.belongsTo(tradePoint.TradePoint, {foreignKey: '_trade_point_id', as: "photo_trade_point"});
tradePoint.TradePoint.hasMany(photo.Photo, {foreignKey: '_trade_point_id', as: "photos"});

phone.Phone.belongsTo(tradePoint.TradePoint, {foreignKey: '_trade_point_id', as: "phone_trade_point"});
tradePoint.TradePoint.hasMany(phone.Phone, {foreignKey: '_trade_point_id', as: "phones"});

fiscalNumber.FiscalNumber.belongsTo(tradePoint.TradePoint, {foreignKey: '_trade_point_id', as: "fn_trade_point"});
tradePoint.TradePoint.hasMany(fiscalNumber.FiscalNumber, {foreignKey: '_trade_point_id', as: "fiscal_numbers"});

bundle.Bundle.belongsTo(tradePoint.TradePoint, {foreignKey: '_trade_point_id', as: "bundle_trade_point"});
tradePoint.TradePoint.hasMany(bundle.Bundle, {foreignKey: '_trade_point_id', as: "trade_point_bundles"});

bundle.Bundle.belongsTo(acquirer_bank.AcquirerBank, {foreignKey: '_bank_id', as: "bundle_acquirer_bank"});
acquirer_bank.AcquirerBank.hasMany(bundle.Bundle, {foreignKey: '_bank_id', as: "acquirer_bank_bundles"});

bundle.Bundle.belongsTo(merchant.Merchant, {foreignKey: '_merchant_id', as: "bundle_merchant"});
merchant.Merchant.hasMany(bundle.Bundle, {foreignKey: '_merchant_id', as: "merchant_bundles"});

merchant.Merchant.hasOne(telegramMerchant.TelegramMerchant, { foreignKey: 'original_merchant_id', as: 'telegram_merchant' });
telegramMerchant.TelegramMerchant.belongsTo(merchant.Merchant, { foreignKey: 'original_merchant_id', as: 'original_merchant' });

tradePoint.TradePoint.belongsTo(place.Place, {foreignKey: '_place_id', as: "trade_point_place"});
place.Place.hasMany(tradePoint.TradePoint, {foreignKey: '_place_id', as: "place_trade_points"});

placeWorkTime.PlaceWorkTime.belongsTo(place.Place, {foreignKey: '_place_id', as: "wt_place"});
place.Place.hasMany(placeWorkTime.PlaceWorkTime, {foreignKey: '_place_id', as: "place_work_time"});

tradePoint.TradePoint.belongsTo(city.City, {foreignKey: '_city_id', as: "trade_point_city"});
city.City.hasMany(tradePoint.TradePoint, {foreignKey: '_city_id', as: "city_trade_points"});

tradePoint.TradePoint.belongsTo(brand.Brand, {foreignKey: '_brand_id', as: "trade_point_brand"});
brand.Brand.hasMany(tradePoint.TradePoint, {foreignKey: '_brand_id', as: "brand_trade_points"});

brandContact.BrandContact.belongsTo(brand.Brand, {foreignKey: 'brand_id', as: "brand"});
brand.Brand.hasMany(brandContact.BrandContact, {foreignKey: 'brand_id', as: "contacts"});

mcc_code.MccCode.belongsToMany(brand.Brand, {
    through: 'brand_mcc',
    as: 'brands',
    foreignKey: 'mcc_id',
    otherKey: 'brand_id'
  });

brand.Brand.belongsToMany(mcc_code.MccCode, {
    through: 'brand_mcc',
    as: 'mccs',
    foreignKey: 'brand_id',
    otherKey: 'mcc_id'
  });

tradePoint.TradePoint.belongsTo(merchant.Merchant, {foreignKey: '_merchant_id', as: "trade_point_merchant"});
merchant.Merchant.hasMany(tradePoint.TradePoint, {foreignKey: '_merchant_id', as: "merchant_trade_points"});

merchant.Merchant.belongsTo(brand.Brand, {foreignKey: '_brand_id', as: "brand"});
brand.Brand.hasMany(merchant.Merchant, {foreignKey: '_brand_id', as: "merchants"});

merchant.Merchant.belongsTo(brand.Brand, {foreignKey: '_dopomoga_brand_id', as: "dopomoga_brand"});
brand.Brand.hasMany(merchant.Merchant, {foreignKey: '_dopomoga_brand_id', as: "dopomoga_merchants"});

brandRules.BrandRules.belongsTo(brand.Brand, {foreignKey: 'brand_id', as: "brand"});
brand.Brand.hasMany(brandRules.BrandRules, {foreignKey: 'brand_id', as: "rules"});

city.City.belongsTo(region.Region, {foreignKey: 'region_id', as: "region"});
region.Region.hasMany(city.City, {foreignKey: 'region_id', as: "cities"});

telegramMerchantUser.TelegramMerchantUser.belongsTo(telegramMerchant.TelegramMerchant, {foreignKey: 'telegram_merchant_id', as: "merchant"});
telegramMerchant.TelegramMerchant.hasMany(telegramMerchantUser.TelegramMerchantUser, {foreignKey: 'telegram_merchant_id', as: "users"});

place.Place.belongsTo(city.City, {foreignKey: '_city_id', as: "city"});
city.City.hasMany(place.Place, {foreignKey: '_city_id', as: "places"});

cityTranslate.CityTranslate.belongsTo(city.City, {foreignKey: 'city_id', as: "city"});
city.City.hasMany(cityTranslate.CityTranslate, {foreignKey: 'city_id', as: "translates"});


baseTerminals.BaseTerminals.belongsTo(city.City, {foreignKey: 'city_id', as: "dbcity"});
city.City.hasMany(baseTerminals.BaseTerminals, {foreignKey: 'city_id', as: "base_terminals"});

baseTerminals.BaseTerminals.belongsTo(brand.Brand, {foreignKey: 'brand_id', as: "brand"});
brand.Brand.hasMany(baseTerminals.BaseTerminals, {foreignKey: 'brand_id', as: "base_terminals"});


acquirer_banks_phone.AcquirerBankPhone.belongsTo(acquirer_bank.AcquirerBank, {foreignKey: '_acquirer_bank_id', as: "bank"});
acquirer_bank.AcquirerBank.hasMany(acquirer_banks_phone.AcquirerBankPhone, {foreignKey: '_acquirer_bank_id', as: "phones"});

searchWord.SearchWord.belongsTo(productCategory.ProductCategory, {foreignKey: 'category_id', as: "category"});
productCategory.ProductCategory.hasMany(searchWord.SearchWord, {foreignKey: 'category_id', as: "search_words"});

trademarkSearchWord.TrademarkSearchWord.belongsTo(trademark.Trademark, {foreignKey: 'trademark_id', as: "trademark"});
trademark.Trademark.hasMany(trademarkSearchWord.TrademarkSearchWord, {foreignKey: 'trademark_id', as: "search_words"});

productRegionSearchWord.ProductRegionSearchWord.belongsTo(productRegion.ProductRegion, {foreignKey: 'product_region_id', as: "region"});
productRegion.ProductRegion.hasMany(productRegionSearchWord.ProductRegionSearchWord, {foreignKey: 'product_region_id', as: "search_words"});

trademark.Trademark.belongsTo(productRegion.ProductRegion, {foreignKey: 'region_id', as: "region"});
productRegion.ProductRegion.hasMany(trademark.Trademark, {foreignKey: 'region_id', as: "trademarks"});


telegramUserHistory.TelegramUserHistory.belongsTo(telegramTradePoint.TelegramTradePoint, {foreignKey: 'trade_point_id', as: "trade_point"});
telegramTradePoint.TelegramTradePoint.hasMany(telegramUserHistory.TelegramUserHistory, {foreignKey: 'trade_point_id', as: "history_items"});


MerchantActivityType.MerchantActivityType.belongsTo(ActivityType.ActivityType, {foreignKey: '_activity_type_id', as: "activity_type"});
ActivityType.ActivityType.hasMany(MerchantActivityType.MerchantActivityType, {foreignKey: '_activity_type_id', as: "merchant_activity_types"});

MerchantActivityType.MerchantActivityType.belongsTo(merchant.Merchant, {foreignKey: '_merchant_id', as: "merchant"});
merchant.Merchant.hasMany(MerchantActivityType.MerchantActivityType, {foreignKey: '_merchant_id', as: "activity_type_list"});


BotHelp.BotHelp.hasMany(BotHelp.BotHelp, { as: 'elements', foreignKey: 'parent', useJunctionTable: false });
BotHelp.BotHelp.belongsTo(BotHelp.BotHelp, { as: 'parents', foreignKey: 'parent', useJunctionTable: false });

exports.connection = connection;
exports.sequelize = connection.sequelize;

exports.LegalEntity = legalEntity.LegalEntity;
exports.ProductCategory = productCategory.ProductCategory;
exports.SearchWord = searchWord.SearchWord;
exports.ReservedPhrases = reservedPhrases.ReservedPhrases;
exports.Trademark = trademark.Trademark;
exports.TrademarkSearchWord = trademarkSearchWord.TrademarkSearchWord;
exports.SearchWordException = searchWordException.SearchWordException;
exports.ProductRegionSearchWord = productRegionSearchWord.ProductRegionSearchWord;
exports.ProductRegion = productRegion.ProductRegion;
exports.BaseTerminals = baseTerminals.BaseTerminals;

exports.Merchant = merchant.Merchant;
exports.TradePoint = tradePoint.TradePoint;
exports.DuplicateTradePoint = duplicateTradePoint.DuplicateTradePoint;
exports.TradePointWorkTime = tradePointWorkTime.TradePointWorkTime;
exports.Bundle = bundle.Bundle;


exports.FiscalNumber = fiscalNumber.FiscalNumber;
exports.Phone = phone.Phone;
exports.Photo = photo.Photo;

exports.TSCity = ts_city.TSCity;
exports.TSTp = ts_tp.TSTp;

exports.Admin = admin.Admin;
exports.Brand = brand.Brand;
exports.City = city.City;
exports.Region = region.Region;
exports.StaticContent = staticContent.StaticContent;
exports.Bank = bank.Bank;
exports.MccCode = mcc_code.MccCode;

exports.AcquirerBank = acquirer_bank.AcquirerBank;
exports.AcquirerBankPhone = acquirer_banks_phone.AcquirerBankPhone;

exports.Place = place.Place;
exports.PlaceWorkTime = placeWorkTime.PlaceWorkTime;
exports.PlacePhone = place_phone.PlacePhone;
exports.PlacePhoto = place_photo.PlacePhoto;

exports.TelegramUser = telegramUser.TelegramUser;
exports.TelegramMerchant = telegramMerchant.TelegramMerchant;
exports.TelegramTradePoint = telegramTradePoint.TelegramTradePoint;
exports.TelegramBundle = telegramBundle.TelegramBundle;
exports.TelegramDonatsMerchant = telegramDonatsMerchant.TelegramDonatsMerchant;
exports.TmpBaseMcCheck = TmpBaseMcCheck.TmpBaseMcCheck;
exports.XmlMerchants = xmlMerchant.XmlMerchants;
exports.TelegramUserHistory = telegramUserHistory.TelegramUserHistory;

exports.CityTranslate = cityTranslate.CityTranslate;
exports.AddressTranslate = address_translate.AddressTranslate;
exports.StreetTranslate = street_translate.StreetTranslate;

//rules
exports.BrandRules = brandRules.BrandRules;
exports.TelegramChekUser = telegramChekUser.TelegramChekUser;

exports.TelegramUserCheck = TelegramUserCheck.TelegramUserCheck;
exports.TelegramMerchantUser = telegramMerchantUser.TelegramMerchantUser;

exports.BrandContact = brandContact.BrandContact;
exports.OrdersToParseTaxgov = OrdersToParseTaxgov.OrdersToParseTaxgov;
exports.ParsedEdrpou = ParsedEdrpou.ParsedEdrpou;
exports.ActivityType = ActivityType.ActivityType;
exports.MerchantActivityType = MerchantActivityType.MerchantActivityType;

exports.MtprotoPhones = MtprotoPhones.MtprotoPhones;
exports.TelegramClient = TelegramClient.TelegramClient;
exports.TaxgovToken = taxgovToken.TaxgovToken;
exports.TaxgovRequest = taxgovRequest.TaxgovRequest;
exports.AuditLogs = AuditLogs.AuditLogs;
exports.ViberUser = ViberUser.ViberUser;
exports.TelegramPaymentBody = TelegramPaymentBody.TelegramPaymentBody;
exports.TelegramTransaction = TelegramTransaction.TelegramTransaction;
exports.CouchUser = couchUser.CouchUser;
exports.BotHelp = BotHelp.BotHelp;
exports.BotSupport = BotSupport.BotSupport;
exports.BotStatistics = BotStatistics.BotStatistics;
exports.KeyboardPaymentBody = KeyboardPaymentBody.KeyboardPaymentBody;
exports.KeyboardUser = KeyboardUser.KeyboardUser;
exports.KeyboardMerchant = KeyboardMerchant.KeyboardMerchant;
exports.TelegramWatchdogUser = TelegramWatchdogUser.TelegramWatchdogUser;
exports.KeyboardImage = KeyboardImage.KeyboardImage;
exports.KeyboardVersion = KeyboardVersion.KeyboardVersion;
exports.IpayFrogAdmin = IpayFrogAdmin.IpayFrogAdmin;
exports.KeyboardP2pPaymentBody = KeyboardP2pPaymentBody.KeyboardP2pPaymentBody;
exports.KeyboardSettings = KeyboardSettings.KeyboardSettings;
exports.KeyboardFeedback = KeyboardFeedback.KeyboardFeedback;
exports.KeyboardP2pPayoutBody = KeyboardP2pPayoutBody.KeyboardP2pPayoutBody;
exports.KeyboardP2pPayoutLogs = KeyboardP2pPayoutLogs.KeyboardP2pPayoutLogs;
exports.FrogAdmin = FrogAdmin.FrogAdmin;
exports.Mcc = Mcc.Mcc;
exports.MerchantMcc = MerchantMcc.MerchantMcc;
exports.KeyboardDevice = KeyboardDevice.KeyboardDevice;

exports.KeyboardSender = KeyboardSender.KeyboardSender;
exports.KeyboardPaymentShow = KeyboardPaymentShow.KeyboardPaymentShow;
exports.KeyboardFeedbackEmail = KeyboardFeedbackEmail.KeyboardFeedbackEmail;