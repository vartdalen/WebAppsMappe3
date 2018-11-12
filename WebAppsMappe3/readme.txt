Setup for fungerende Entity Framework Core database:
1. I Soloution Explorer, slett mappen som heter migrations.
2. Inne i SQL Server explorer, hvis det finnes en database som heter
	FAQsDB, slett FAQ, Question og Migration tabellen hvis de ligger der.
3. Åpne Package Manager Console og kjør følgende kommandoer:
	- Add-Migration InitialCreate
	- Update-Database
	Hvis det kommer en feilmelding om at FAQ tabellen allerede eksisterer,
	så er det ikke noe feil.
4. Kjør prosjektet, det skal være 3 forhåndsdefinerte spørsmål inne
	på FAQ siden.
