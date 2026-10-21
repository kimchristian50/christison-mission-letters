# Letters from Sister Christison
A simple website for Zoe's weekly mission emails, with a signup form that emails you each new subscriber's address. Every letter is a plain text file. There is no database and nothing to log into except GitHub and Netlify.

**How it fits together**

- `src/letters/` holds one Markdown file per weekly letter.
- `src/photos/` holds the photos, one folder per week.
- `src/_data/site.json` holds her name, mission, and the intro text on the home page.
- Eleventy turns those files into the website. Netlify hosts it for free and rebuilds it every time you change a file on GitHub.

---

## One-time setup (about 30 minutes)

### 1. Personalize it

Open `src/_data/site.json` and change:

- `title`, for example `Letters from Sister Christensen`
- `missionaryName`, for example `Sister Christensen` (used in the header and the signup text)
- `mission`, for example `Florida Tampa Mission`
- `intro`, the paragraph on the home page

Then delete the three sample letters in `src/letters/` (the files starting with `2026-10-`) and the `src/photos/sample/` folder. Leave `letters.json` in place; it tells the site how to show letters.

### 2. Put it on GitHub

1. Create a free account at github.com if you don't have one.
2. Click **New repository**, name it something like `zoe-mission-letters`, and create it.
3. On the empty repository page, click **uploading an existing file**, drag in everything from this folder (including the `src` folder), and click **Commit changes**.

### 3. Publish it on Netlify

1. Sign up at netlify.com using **Sign up with GitHub**.
2. Choose **Add new project → Import an existing project → GitHub**, and pick your repository.
3. Netlify reads the settings from `netlify.toml`, so just click **Deploy**. In a minute or two you'll get a web address like `something-random.netlify.app`.
4. Under **Project configuration → General → Change project name**, pick a friendlier name, like `sister-zoe.netlify.app`.

### 4. Turn on the signup emails

1. In Netlify, open **Forms** and click **Enable form detection**. Then go to **Deploys** and click **Trigger deploy → Deploy project** so Netlify finds the form.
2. Go to **Project configuration → Notifications → Emails and webhooks → Form submission notifications**, click **Add notification → Email notification**, choose the `subscribe` form, and enter Zoe's mission email address.
3. Test it: sign up on the live site with your own email. Zoe should get a message with the name and address within a minute. The reply-to is set to the subscriber, so she can reply to them directly.

Every signup is also saved under **Forms → subscribe** in Netlify, so you have a backup list if an email gets lost. Spam signups are filtered automatically.

---

## Every week: add a letter (about 5 minutes)

1. If there are photos, upload them first (see "Adding photos" below). A letter that points to a photo that isn't uploaded yet will stop the site from updating.
2. On GitHub, open the `src/letters` folder and click **Add file → Create new file**.
3. Name it with the date and week, like `2026-10-26-week-4.md`. The part after the date becomes the web address (`/letters/week-4/`), so keep each one unique.
4. Copy everything from `NEW-LETTER-TEMPLATE.md` into it, then fill in the top section and paste Zoe's email underneath.
5. Click **Commit changes**. The site updates in about a minute.

**The top section (between the `---` lines)**

| Line | What it does | Required? |
|---|---|---|
| `title:` | The letter's headline | Yes |
| `date:` | Written as `YYYY-MM-DD`. Letters are sorted by this | Yes |
| `week:` | Shows "Week 4" | No |
| `area:` | Shows "in Gainesville" | No |
| `photos:` | The photo gallery (see below) | No |
| `album:` | Adds a button linking to a full Google Photos album | No |

If a line doesn't apply this week, delete it. Keep the `---` lines exactly as they are. If a title contains a colon, wrap it in quotes: `title: "Week 4: Hurricane prep"`.

**Formatting inside the letter:** leave a blank line between paragraphs. `**bold**` makes bold text, `*italic*` makes italics, and a line starting with `>` becomes an indented quote (nice for scriptures).

---

## Adding photos from Google Photos

Google Photos doesn't offer a dependable way for other websites to show its pictures directly, so the reliable approach is to keep a copy of each photo with the site. It's also a nice permanent backup of her mission photos.

1. In Google Photos, select the week's photos and choose **Download**. (Several at once arrive as a .zip; open it.)
2. If the files end in `.heic` (common with iPhones), convert them to `.jpg` first. Most browsers can't display HEIC. On a Mac, open them in Preview and use **File → Export → JPEG**; on Windows, the Photos app can **Save as** JPEG.
3. On your computer, make a folder named with the letter's date, like `2026-10-26`, and put the photos in it. Give them simple names with no spaces, like `beach.jpg` or `district.jpg`.
4. On GitHub, open `src/photos`, click **Add file → Upload files**, and drag the whole folder onto the page (not just the photos). GitHub keeps the folder, so each week's photos stay together. Click **Commit changes**.
5. In the letter, list each photo by folder and filename:

```yaml
photos:
  - file: 2026-10-26/beach.jpg
    caption: P-day at the beach
```

You don't need to shrink the photos. The site automatically makes smaller, fast-loading copies when it builds, and clicking a photo opens the full-size original.

**Sharing the whole album too:** in Google Photos, open the album, tap **Share → Create link**, copy it, and paste it after `album:` in the letter. Visitors get a button to see every photo.

**Photos in the middle of the letter:** you can also place a photo inside the text with `![Description of the photo](/photos/2026-10-26/beach.jpg)` on its own line.

---

## Previewing on your own computer (optional)

You never have to do this, since Netlify builds the site for you. If you'd like to see changes before publishing, install Node.js (version 18 or newer) from nodejs.org, then in this folder run:

```
npm install
npm start
```

and open the address it prints (usually http://localhost:8080).

## Changing the look

All colors live at the top of `src/css/style.css`, with a comment beside each one. Change a value there and it updates everywhere.

## If something goes wrong

- **The site didn't update.** In Netlify, open **Deploys**. A red "Failed" deploy means something in the newest file has a typo. Click it and scroll to the end of the log; it usually names the file and line. The most common culprits are a missing `---` line, a title with a colon that isn't in quotes, or a photo filename that doesn't match the file you uploaded (capital letters count: `Beach.JPG` is not `beach.jpg`).
- **A photo doesn't show.** Check the spelling and folder name in the `file:` line.
- **No signup emails.** Check that form detection is on, that you redeployed after turning it on, and that the notification uses the right address. Also check spam.
