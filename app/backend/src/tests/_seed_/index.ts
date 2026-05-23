import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"


export async function seedDatabase() {
  const password1 = await bcrypt.hash("12345678",10)
  const password2 = await bcrypt.hash("1234beme",10)
  const usersData = [
    { email: 'user1@test.com', name: 'User 1', password: password1 },
    { email: 'user2@test.com', name: 'User 2', password: password2 }
  ];

  await prisma.user.createMany({
    data: usersData
  });

  const dbUsers = await prisma.user.findMany();

  const userMap = new Map(
    dbUsers.map(u => [u.email, u.id])
  );


  const storesData = [
    { name: 'Store 1', userEmail: 'user1@test.com' ,description:"lorem iptus",photo:"/test"},
    { name: 'Store 2', userEmail: 'user2@test.com',description:"lorem iptsu", photo:"/test2"}
  ];

  const storesFormatted = storesData.map(s => ({
    name: s.name,
    userId: userMap.get(s.userEmail)!,
    description:s.description,
    photo:s.photo
  }));

  await prisma.store.createMany({
    data: storesFormatted
  });

  const dbStores = await prisma.store.findMany();

  const storeMap = new Map(
    dbStores.map(s => [s.name, s.id])
  );


  const productsData = [
    { name: 'Produto A', price: 100, storeName: 'Store 1' ,stock:50,description:"lorem",imageUrl:"image",category:"shoes"},
    { name: 'Produto B', price: 200, storeName: 'Store 2' ,stock:20,description:"lorem itpsy",imageUrl:"image",category:"shoes"}
  ];

  const productsFormatted = productsData.map(p => ({
    name: p.name,
    price: p.price,
    stock:p.stock,
    description: 'Produto teste',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'default',
    storeId: storeMap.get(p.storeName)!
    }));

  await prisma.product.createMany({
    data: productsFormatted
  });


  await prisma.coupon.createMany({
    data: [
      { code: 'DESCONTO10', discount: 10,discountType:"percent" ,quantity:50,  expiresAt: new Date('2026-12-31')},
      { code: 'DESCONTO20', discount: 20 ,discountType:"fixed",quantity:50,  expiresAt: new Date('2026-12-31')}
    ]
  });



  console.log(' Seed finalizado');
}