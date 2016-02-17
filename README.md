# webappPrehospitalization-

Implemented by Simon Strunk for his 2014 Master's thesis entitled "Webapplikation zur Analyse der Prähospitalzeit durch bodengebundene oder luftgestützte Rettungsmittel in Mecklenburg-Vorpommern", Rostock University.

Helicopter Emergency Medical Services (HEMS) can reduce the transport time over long distances compared to road-bound vehicles significantly especially in rural areas. In order to analyze this, compare them and to give dispatch as well as responders a tool to dynamically plan rescue missions and evaluate if HEMS would make sense because it would reduce the prehospitalization period. 
The two inputs needed for such an application are
 - some specific scenarios of emergency, e.g. stroke, myocardial infarction (which requires lysis therapy resp. PCI as soon as possible) or severe trauma (to be treated within the “golden hour”) etc., and
 - the place, i.e. the address or coordinates, where the emergency is located.

With these two inputs the nearest medical facility with an appropriate vehicle can be identified based on a database that contains location information of all rescue facilities and hospitals. Finally, the results are a map with driving and flight routes on the one hand and the distances and time periods of each on the other hand.

Implemented using Ruby on Rails 4.1 and Sencha Touch 2.3 (2.4.1?) which is already included, which means just put in in some dir of your web server and test it right away.
