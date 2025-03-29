import React from 'react'
import { USD_EXCHANGE } from '@/config/appConfig'

const currencyToSymbol = (currency) => {
    if (currency == "TRY")
        return "₺"
    else if (currency == "USD")
        return "$"
    else return "₺"
}

const priceCalculator = (currency, price) => {
    if (currency == "TRY")
        return price
    else if (currency == "USD")
        return (price / USD_EXCHANGE)
    else return price
}

async function saveLocalStore(key, value) {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.log(error)
    }
}

async function getLocalStore(key) {

    let result = null;
    try {
        result = await localStorage.getItem(key);
    } catch (error) {
        result = null
    }
    return result;
}
async function deleteLocalStore(key) {
    await localStorage.deleteItem(key);
}

const isNullOrEmpty = (value) => (value === "" || value === null || value === undefined || value === "undefined" || (value instanceof Array && value?.length === 0))

const errorMsgControl = (message) => {
    return message ? message : "Bir hata oluştu, lütfen tekrar deneyin.";
}

const debounce = (func, delay) => {
    let debounceTimer = null;
    return function () {
        const context = null;
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}
const isNumber = (value) => matchRegexp(value, /^\d+$/);

const isFloat = (value) => {
    const isFloatx = matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i);
    return isFloatx;
}
const matchRegexp = (value, regexp) => {
    const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
    return (validationRegexp.test(value));
}

const formatUsername = (username) => {
    return username
        .toLowerCase()
        .replace(/[^a-z0-9._]/g, '')
        .replace(/\s+/g, '');
}

const generateRandomString = (length = 15) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateRandomNumber = (length = 1) => {
    var result = '';
    var characters = '1234';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const addDaysToDate = (date, day) => {
    date.setDate(date.getDate() + day);
    return date;
}

const getFileExtension = (fileName) => fileName?.substr(fileName?.lastIndexOf('.') + 1)?.toLowerCase();

async function formatPhoneNumber(phoneNumberString) {
    let newPhone = phoneNumberString;
    return await newPhone?.replace(/\D/g, '');
}

function formatPhoneNumberContact(phoneNumberString) {
    let newPhone = phoneNumberString;
    let newStr = newPhone.replace(/\s+/g, '');
    newStr = newStr.replace('(', '');
    newStr = newStr.replace(')', '');
    if (newStr.substr(0, 1) != "+") {
        newStr = "+9" + newStr;
    }
    return newStr;
}

function editPhone(phoneNumberString) {
    let newPhone = phoneNumberString;
    if (newPhone[0] === "0")
        newPhone = newPhone.substr(1);
    return newPhone;
}

const isImageExtension = (extension) => ["jpg", "jpeg", "png"].includes(extension?.toLowerCase());

const isVideoExtension = (extension) => ["mp3", "mp4", "", "mov"].includes(extension?.toLowerCase());

const extensionTomime = async (extension) => {
    let mime = null
    if (extension == "mov") mime = "video/quicktime"
    else if (extension == "jpg") mime = "image/jpg"
    else if (extension == "jpeg") mime = "image/jpeg"
    else if (extension == "mp4") mime = "video/mp4"
    else if (extension == "png") mime = "image/png"
    return mime
}
const replaceAll = (text, replacements) => {
    replacements.forEach((item) => {
        text = text.split(item?.oldWord).join(item?.newWord);
    });
    return text;
}

export default {
    saveLocalStore,
    getLocalStore,
    deleteLocalStore,
    isNullOrEmpty,
    getFileExtension,
    addDaysToDate,
    formatPhoneNumber,
    isImageExtension,
    isVideoExtension,
    generateRandomString,
    isNumber,
    generateRandomNumber,
    errorMsgControl,
    replaceAll,
    formatPhoneNumberContact,
    editPhone,
    isFloat,
    matchRegexp,
    debounce,
    extensionTomime,
    formatUsername,
    currencyToSymbol,
    priceCalculator
}