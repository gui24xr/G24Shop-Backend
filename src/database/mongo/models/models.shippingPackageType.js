import mongoose from "mongoose"

const modelName = 'ShippingPackageType'


const ShippingPackageTypeSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      commonUses: [{
        type: String,
      }],
      translations: {
        es: {
          name: { type: String,  },
          description: { type: String, },
          commonUses: [{ type: String}]
        },
        fr: {
          name: { type: String,  },
          description: { type: String,},
          commonUses: [{ type: String}]
        }
      }
    })


export const ShippingPackageType  = mongoose.model(modelName,ShippingPackageTypeSchema)

/*
const shippingPackage = new ShippingPackageType({
    name: "Caja mediana",
    description: "Caja para envíos medianos",
    commonUses: ["Envíos de libros", "Envíos de ropa"],
    translations: {
      es: {
        name: "Caja mediana",
        description: "Caja para envíos medianos",
        commonUses: ["Envíos de libros", "Envíos de ropa"]
      },
      fr: {
        name: "Boîte moyenne",
        description: "Boîte pour envois moyens",
        commonUses: ["Envois de livres", "Envois de vêtements"]
      }
    }
  });
  
  await shippingPackage.save();
  */