Setup for fungerende Entity Framework Core database:
1. I Soloution Explorer, slett mappen som heter migrations.
2. Inne i SQL Server explorer, hvis det finnes en database som heter
	FAQsDB, slett FAQ, Question og Migration tabellen hvis de ligger der.
3. �pne Package Manager Console og kj�r f�lgende kommandoer:
	- Add-Migration InitialCreate
	- Update-Database
	Hvis det kommer en feilmelding om at FAQ tabellen allerede eksisterer,
	s� er det ikke noe feil.
4. Kj�r prosjektet, det skal v�re 3 forh�ndsdefinerte sp�rsm�l inne
	p� FAQ siden.
