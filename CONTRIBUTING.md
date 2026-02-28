# Mitarbeit am Projekt (Contributing Guide)

Willkommen! Diese Datei erklärt, wie du an diesem Projekt arbeitest und welche Spielregeln gelten.

---

## Inhaltsverzeichnis

1. [Entwicklungsumgebung einrichten](#1-entwicklungsumgebung-einrichten)
2. [Git-Workflow (Branching-Strategie)](#2-git-workflow)
3. [Commit-Konventionen](#3-commit-konventionen)
4. [Code-Qualität](#4-code-qualität)
5. [Verfügbare Skripte](#5-verfügbare-skripte)

---

## 1. Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js >= 18
- npm >= 9

### Setup

```bash
# 1. Repository klonen
git clone <repo-url>
cd cosmic-webapp-fe

# 2. Dependencies installieren
npm install

# 3. Umgebungsvariablen anlegen
cp .env.example .env
# Fülle die .env Datei mit echten Werten

# 4. Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5173` erreichbar.

### Umgebungsvariablen (`.env`)

| Variable | Beschreibung | Pflicht |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Authentifizierungs-Key | ✅ |
| `VITE_MATTERPORT_MODEL_ID` | Matterport 3D-Modell ID | ✅ |
| `VITE_MATTERPORT_KEY` | Matterport API Key | ✅ |
| `VITE_API_URL` | Backend API URL | ✅ |

---

## 2. Git-Workflow

Wir nutzen einen einfachen Branch-basierten Workflow:

```
main          ← nur stabile, getestete Version (Production)
  └── develop ← Integrationsebene (alle Features werden hier zusammengeführt)
        └── feature/beschreibung ← dein Feature-Branch
```

### So arbeitest du an einem neuen Feature

```bash
# 1. Stelle sicher, dass du auf dem aktuellen Stand von develop bist
git checkout develop
git pull origin develop

# 2. Erstelle einen neuen Branch für deine Änderung
git checkout -b feature/mein-feature-name

# 3. Mache deine Änderungen und committe regelmäßig
git add src/components/MeineKomponente.tsx
git commit -m "feat: MeineKomponente hinzugefügt"

# 4. Pushe deinen Branch auf GitHub
git push -u origin feature/mein-feature-name

# 5. Erstelle einen Pull Request auf GitHub von deinem Branch → develop
```

### Wichtige Regeln

- **Niemals direkt in `main` oder `develop` pushen**
- **Jeden Pull Request vor dem Merge reviewen lassen** (mindestens 1 Person)
- **Branches klein halten** – ein Feature pro Branch

---

## 3. Commit-Konventionen

Wir verwenden **Conventional Commits** – ein simples Format für Commit-Nachrichten:

```
<typ>: <kurze Beschreibung>
```

### Typen

| Typ | Bedeutung | Beispiel |
|---|---|---|
| `feat` | Neue Funktion | `feat: Dokumenten-Upload hinzugefügt` |
| `fix` | Bugfix | `fix: Login-Fehler bei leerem Passwort behoben` |
| `test` | Tests hinzugefügt/geändert | `test: Tests für TaskWindow geschrieben` |
| `refactor` | Code-Umstrukturierung (kein Bug, kein Feature) | `refactor: API-Calls in eigenen Hook ausgelagert` |
| `docs` | Dokumentation | `docs: CONTRIBUTING.md aktualisiert` |
| `style` | Formatierung, keine Logikänderung | `style: Leerzeichen in Button-Komponente entfernt` |
| `chore` | Hilfstasks (Dependencies updaten, Config) | `chore: Vitest als Test-Framework installiert` |

### Beispiele

```bash
# Gut ✅
git commit -m "feat: Benachrichtigungs-Badge auf dem Glocken-Icon hinzugefügt"
git commit -m "fix: Absturz beim Löschen eines Tasks ohne Dokumente behoben"
git commit -m "test: Unit-Tests für useLocations Hook geschrieben"

# Schlecht ❌
git commit -m "changes"
git commit -m "fix stuff"
git commit -m "."
```

---

## 4. Code-Qualität

### Vor jedem Commit prüfen

```bash
# TypeScript-Fehler prüfen
npm run type-check

# ESLint-Fehler prüfen
npm run lint

# Code formatieren
npm run format

# Tests laufen lassen
npm run test
```

Alle vier Befehle müssen ohne Fehler durchlaufen, bevor du einen Pull Request erstellst.

### Was wird im Code-Review geprüft?

- Keine TypeScript-Fehler (`any` vermeiden)
- Keine ESLint-Warnungen
- Komponenten sind nicht zu groß (max. ~200 Zeilen pro Datei)
- Keine duplizierten API-Calls (RTK Query-Caching nutzen)
- Fehlerbehandlung vorhanden (leere States, Ladezustände)

---

## 5. Verfügbare Skripte

```bash
npm run dev         # Entwicklungsserver starten
npm run build       # Production-Build erstellen
npm run preview     # Production-Build lokal anschauen
npm run lint        # Code auf ESLint-Fehler prüfen
npm run type-check  # TypeScript-Fehler prüfen
npm run format      # Code automatisch formatieren
npm run test        # Tests ausführen (nach Einrichtung von Vitest)
```

---

## Fragen?

Bei Fragen zum Projekt oder zu diesen Regeln: Issue auf GitHub erstellen oder direkt nachfragen.
