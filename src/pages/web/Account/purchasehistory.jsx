export const PurchaseHistory = () => {
  const purchaseData = [
    { id: 1, product: 'Nike Airforce 1', date: '2024-10-01', amount: '200€' },
    { id: 2, product: 'Nike Hunter', date: '2024-08-15', amount: '122$' },
    { id: 3, product: 'Bitis Hunter', date: '2024-07-10', amount: '100$' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Purchase History
      </h2>
      <div className="space-y-4">
        {purchaseData.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.product}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Date: {item.date}</p>
            </div>
            <div className="text-lg font-bold text-gray-700">{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
