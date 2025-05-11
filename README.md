InmoCrypto

Esta aplicación móvil en React Native muestra cotizaciones de criptomonedas en USD.

Requisitos Previos

Node.js >= 18.x

Yarn o npm

Watchman (recomendado en macOS)

Android Studio (para Android)

Xcode (para iOS en macOS)

Pasos para Descargar y Ejecutar Localmente

Clonar el repositorio

git clone https://github.com/TU_USUARIO/InmoCrypto.git
cd InmoCrypto

Instalar dependencias

npm install       # o yarn install

Configurar iOS (solo macOS)

cd ios
pod install --repo-update
cd ..

Ejecutar en Android

Asegúrate de tener un emulador o dispositivo conectado.

En la raíz del proyecto:

npx react-native run-android

Ejecutar en iOS (solo macOS)

Ejecuta en la raíz del proyecto:

npx react-native run-ios --simulator "iPhone 16 Pro"

O abre ios/InmoCrypto.xcworkspace en Xcode y presiona Run.

Uso de la App

La pantalla principal lista las criptomonedas con su precio en USD.

Puedes filtrar escribiendo en el buscador.

Al pulsar una moneda, entras al detalle con información extendida.

Limpieza de Caché (Opcional)

Si encuentras problemas de cache o peticiones, puedes reiniciar:

# Elimina nodemodules y reinstala
enforce windows-line-endings
rm -rf node_modules ios/Pods ios/Pods.lock
npm install
cd ios && pod install
yarn start --reset-cache

Contacto

Para cualquier duda, contacta a hr@millionluxury.com con tu consulta.