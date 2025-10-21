const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("salesDB"); 
    const collection = db.collection("sales"); 


    const salesData = [
      { saleId: 1, product: "Laptop", category: "Electronics", amount: 800, date: "2024-01-10", region: "North" },
      { saleId: 2, product: "Mobile", category: "Electronics", amount: 500, date: "2024-02-15", region: "South" },
      { saleId: 3, product: "Shoes", category: "Fashion", amount: 200, date: "2024-01-20", region: "North" },
      { saleId: 4, product: "TV", category: "Electronics", amount: 1000, date: "2024-03-05", region: "West" },
      { saleId: 5, product: "T-shirt", category: "Fashion", amount: 50, date: "2024-02-25", region: "East" },
      { saleId: 6, product: "Headphones", category: "Electronics", amount: 150, date: "2024-04-01", region: "South" },
      { saleId: 7, product: "Watch", category: "Fashion", amount: 300, date: "2024-03-15", region: "North" },
      { saleId: 8, product: "Laptop", category: "Electronics", amount: 850, date: "2024-02-12", region: "West" },
      { saleId: 9, product: "Shoes", category: "Fashion", amount: 250, date: "2024-04-18", region: "South" }
    ];

    const totalSalesPerCategory = await collection.aggregate([
      { $group: { _id: "$category", totalSales: { $sum: "$amount" } } }
    ]).toArray();
    console.log("1. Total sales per category:", totalSalesPerCategory);

    // 2. Month-wise total sales
    const monthWiseSales = await collection.aggregate([
      { $addFields: { month: { $month: { $dateFromString: { dateString: "$date" } } } } },
      { $group: { _id: "$month", totalSales: { $sum: "$amount" } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("2. Month-wise total sales:", monthWiseSales);

    // 3. Highest-selling product
    const highestSellingProduct = await collection.aggregate([
      { $group: { _id: "$product", totalRevenue: { $sum: "$amount" } } },
      { $sort: { totalRevenue: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("3. Highest-selling product:", highestSellingProduct);

    // 4. Average sale amount
    const avgSaleAmount = await collection.aggregate([
      { $group: { _id: null, avgAmount: { $avg: "$amount" } } }
    ]).toArray();
    console.log("4. Average sale amount:", avgSaleAmount);

    // 5. Count sales per month
    const salesCountPerMonth = await collection.aggregate([
      { $addFields: { month: { $month: { $dateFromString: { dateString: "$date" } } } } },
      { $group: { _id: "$month", salesCount: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("5. Sales count per month:", salesCountPerMonth);

    // 6. Total sales per region
    const totalSalesPerRegion = await collection.aggregate([
      { $group: { _id: "$region", totalSales: { $sum: "$amount" } } }
    ]).toArray();
    console.log("6. Total sales per region:", totalSalesPerRegion);

    // 7. Top 3 highest revenue products
    const top3Products = await collection.aggregate([
      { $group: { _id: "$product", totalRevenue: { $sum: "$amount" } } },
      { $sort: { totalRevenue: -1 } },
      { $limit: 3 }
    ]).toArray();
    console.log("7. Top 3 revenue-generating products:", top3Products);

    // 8. Total transactions per category
    const transactionsPerCategory = await collection.aggregate([
      { $group: { _id: "$category", transactionCount: { $sum: 1 } } }
    ]).toArray();
    console.log("8. Total transactions per category:", transactionsPerCategory);

    // 9. Average sales amount per region
    const avgSalesPerRegion = await collection.aggregate([
      { $group: { _id: "$region", avgAmount: { $avg: "$amount" } } }
    ]).toArray();
    console.log("9. Average sales per region:", avgSalesPerRegion);

    // 10. Total sales for Electronics and Fashion
    const totalSalesElectronicsFashion = await collection.aggregate([
      { $match: { category: { $in: ["Electronics", "Fashion"] } } },
      { $group: { _id: "$category", totalSales: { $sum: "$amount" } } }
    ]).toArray();
    console.log("10. Total sales for Electronics & Fashion:", totalSalesElectronicsFashion);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
