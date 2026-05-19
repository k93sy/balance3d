-- ================================================================
--  Balance 3D — Sample Orders & Customers Seed
--  Run after schema.sql
-- ================================================================

insert into public.orders
  (id, customer_name_en, customer_name_ar, customer_email,
   city_en, city_ar, product_name, amount, status,
   items, tracking_number, payment_method, payment_status, order_date)
values
  ('ORD-1000','Ahmed Al-Shamri','أحمد الشمري','ahmedalshamri@email.com','Riyadh','الرياض','Articulated Dragon',290,'delivered',2,'SA123456789','credit_card','paid', current_date - 0),
  ('ORD-1001','Fatima Al-Otaibi','فاطمة العتيبي','fatimaslotaibi@email.com','Jeddah','جدة','Desk Organizer Pro',178,'processing',2,null,'mada','paid', current_date - 1),
  ('ORD-1002','Mohammed Al-Ghamdi','محمد الغامدي','mohammedalghamdi@email.com','Dammam','الدمام','Mini Skyline Model',220,'shipped',1,'SA987654321','stc_pay','paid', current_date - 2),
  ('ORD-1003','Sara Al-Zahrani','سارة الزهراني','saraaalzahrani@email.com','Makkah','مكة المكرمة','Geometric Ring Set',65,'pending',1,null,'cash','pending', current_date - 3),
  ('ORD-1004','Abdullah Al-Qahtani','عبدالله القحطاني','abdullahalqahtani@email.com','Madinah','المدينة المنورة','Vase Collection',110,'delivered',1,'SA555555555','credit_card','paid', current_date - 4),
  ('ORD-1005','Ahmed Al-Shamri','أحمد الشمري','ahmedalshamri@email.com','Riyadh','الرياض','Chess Set 3D',340,'cancelled',1,null,'mada','refunded', current_date - 5),
  ('ORD-1006','Fatima Al-Otaibi','فاطمة العتيبي','fatimaslotaibi@email.com','Jeddah','جدة','Scale Car Model',195,'delivered',1,'SA111222333','stc_pay','paid', current_date - 6),
  ('ORD-1007','Mohammed Al-Ghamdi','محمد الغامدي','mohammedalghamdi@email.com','Dammam','الدمام','Articulated Dragon',145,'processing',1,null,'credit_card','paid', current_date - 7),
  ('ORD-1008','Sara Al-Zahrani','سارة الزهراني','saraaalzahrani@email.com','Makkah','مكة المكرمة','Desk Organizer Pro',89,'pending',1,null,'cash','pending', current_date - 8),
  ('ORD-1009','Abdullah Al-Qahtani','عبدالله القحطاني','abdullahalqahtani@email.com','Madinah','المدينة المنورة','Gear Mechanism',175,'shipped',1,'SA444444444','mada','paid', current_date - 9),
  ('ORD-1010','Ahmed Al-Shamri','أحمد الشمري','ahmedalshamri@email.com','Riyadh','الرياض','Mini Skyline Model',440,'delivered',2,'SA777888999','credit_card','paid', current_date - 10),
  ('ORD-1011','Fatima Al-Otaibi','فاطمة العتيبي','fatimaslotaibi@email.com','Jeddah','جدة','Geometric Ring Set',195,'processing',3,null,'stc_pay','paid', current_date - 11),
  ('ORD-1012','Mohammed Al-Ghamdi','محمد الغامدي','mohammedalghamdi@email.com','Dammam','الدمام','Vase Collection',220,'delivered',2,'SA333222111','mada','paid', current_date - 12),
  ('ORD-1013','Sara Al-Zahrani','سارة الزهراني','saraaalzahrani@email.com','Makkah','مكة المكرمة','Chess Set 3D',680,'pending',2,null,'credit_card','pending', current_date - 13),
  ('ORD-1014','Abdullah Al-Qahtani','عبدالله القحطاني','abdullahalqahtani@email.com','Madinah','المدينة المنورة','Scale Car Model',390,'shipped',2,'SA666777888','cash','paid', current_date - 14)
on conflict (id) do nothing;

insert into public.customers
  (id, name_en, name_ar, email, phone, city_en, city_ar,
   order_count, total_spent, join_date, status)
values
  ('C100','Ahmed Al-Shamri','أحمد الشمري','ahmedalshamri@email.com','+966 55 123 4567','Riyadh','الرياض',5,1250,current_date - 120,'active'),
  ('C101','Fatima Al-Otaibi','فاطمة العتيبي','fatimaslotaibi0@email.com','+966 56 234 5678','Jeddah','جدة',3,462,current_date - 90,'active'),
  ('C102','Mohammed Al-Ghamdi','محمد الغامدي','mohammedalghamdi1@email.com','+966 57 345 6789','Dammam','الدمام',4,780,current_date - 200,'active'),
  ('C103','Sara Al-Zahrani','سارة الزهراني','saraaalzahrani2@email.com','+966 58 456 7890','Makkah','مكة المكرمة',2,330,current_date - 45,'active'),
  ('C104','Abdullah Al-Qahtani','عبدالله القحطاني','abdullahalqahtani3@email.com','+966 59 567 8901','Madinah','المدينة المنورة',6,1870,current_date - 300,'active'),
  ('C105','Ahmed Al-Shamri','أحمد الشمري','ahmedalshamri4@email.com','+966 55 678 9012','Riyadh','الرياض',1,195,current_date - 30,'active'),
  ('C106','Fatima Al-Otaibi','فاطمة العتيبي','fatimaslotaibi5@email.com','+966 56 789 0123','Jeddah','جدة',8,3200,current_date - 180,'active'),
  ('C107','Mohammed Al-Ghamdi','محمد الغامدي','mohammedalghamdi6@email.com','+966 57 890 1234','Dammam','الدمام',2,265,current_date - 60,'blocked')
on conflict (id) do nothing;
