# 📸 Progen – Profilbild Generator

## 🧩 Projektbeschreibung

**Progen** ist ein Web-Tool, mit dem sich personalisierte Profilbilder direkt im Browser erstellen lassen. Nutzer:innen können ein eigenes Bild hochladen, visuelle Filter auswählen, Farben anpassen und das Ergebnis als PNG speichern – ohne zusätzliche Software oder Vorkenntnisse.

## 🚀 Funktionen

- Bild-Upload (JPG, PNG)
- Auswahl aus 4 visuellen Filtern
- Anpassung der Hintergrundfarbe
- Einstellung der Bildqualität
- Redraw-Funktion (für zufällige Filtermuster)
- Export als PNG-Datei

## 🖼️ Filterübersicht

| Filtername        | Beschreibung                                                                 |
|-------------------|------------------------------------------------------------------------------|
| **Yellow Shapes** | Helle Farben mit Kreisen, Pfeilen und Kritzeleien                           |
| **Blue Circle**   | Ruhiger, klarer Stil mit blauen Formen                                       |
| **Red Stars**     | Kräftige Rottöne mit auffälligen Symbolen wie Kreuzen und Sternen           |
| **Green Scribbles** | Grüne, wilde Kritzeleien mit zufälligen Symbolen – stark abstrahiert      |

## 🛠️ Verwendete Technologien

- HTML / CSS / JavaScript
- [p5.js](https://p5js.org/) für Bildverarbeitung
- WebGL / GLSL Shader für GPU-beschleunigte Filter
- Git / GitHub für Versionskontrolle

## 📦 Projektstruktur

<pre>
├── index.html
├── main.js
├── filters/
│   ├── filter1/
│   ├── filter2/
│   ├── filter3/
│   └── filter4/
├── assets/
│   └── symbols/
├── style/
│   └── styles.css
</pre>


## ▶️ Nutzung

### Projekt starten – 3 Varianten

Es gibt mehrere Möglichkeiten, das Projekt lokal oder online zu starten:

### ✅ 1. Mit Visual Studio Code 
Direkt über index.html

- Im Code-Editor (z. B. Visual Studio Code oder WebStorm)  
- Rechtsklick auf `index.html` → **„Open in Default Browser“**  
- Funktioniert sofort ohne zusätzliche Installation

### ✅ 2. In Visual Studio Code mit Live Server

Voraussetzung: [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

1. Projektordner in VS Code öffnen  
2. `index.html` mit rechter Maustaste anklicken → **„Open with Live Server“**  
3. Der Browser öffnet sich automatisch

### ✅ 3. Über GitHub Pages

- Projekt auf GitHub veröffentlichen  
- GitHub Pages in den Repository-Einstellungen aktivieren  
- URL:  
  [`https://sven1222225.github.io/ProfilbildGen`](https://sven1222225.github.io/ProfilbildGen)

> 🔒 Hinweis: Die Anwendung läuft komplett im Browser, es werden keine Daten gespeichert oder übertragen.


## 📌 Hinweise

- Einige Filter verwenden Zufall – „Redraw“ führt zu neuen Varianten
- Hohe Qualität = mehr Details, aber langsamer
- Alles läuft lokal im Browser – keine Daten werden hochgeladen

## 📚 Projektinfo

- Modul 306: *Kleinprojekte im eigenen Berufsumfeld abwickeln*  
- Projektlaufzeit: Frühling 2025  
- Ziel: Erstellung eines funktionierenden MVP zur anonymisierten Profilerstellung  
- Status: ✅ Abgeschlossen

