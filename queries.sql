-- # Multi-Table Query Practice #

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select P.ProductName, C.CategoryName
from [Product] as P
join [Category] as C
on P.CategoryID = C.ID

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select O.ID, S.CompanyName
from [Order] as O
join [Shipper] as S
on O.ShipVia = S.ID
where O.OrderDate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select P.ProductName, D.Quantity
from [OrderDetail] as D
join [Product] as P
on D.ProductID = P.ID
where D.OrderID = 10251
order by P.ProductName asc

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select O.ID as OrderID, C.CompanyName as CustomerCompanyName, E.LastName as EmployeeLastName
from [Order] as O
join [Customer] as C
on O.CustomerID = C.ID
join [Employee] as E
on O.EmployeeID = E.ID

-- ## STRETCH ##

-- Display CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.

select C.[CategoryName], count (*) as [Count]
from [Categories] as C
join [Products] as P
on C.[CategoryID] = P.[CategoryID]
group by C.[CategoryName]

-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

select OD.OrderID, count (*) as [ItemCount]
from [OrderDetails] as OD
group by OD.OrderID
