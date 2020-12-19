from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class wait_for_codeeditor_availability(object):
    def __call__(self, driver):
        try:
            return driver.execute_script("return document.querySelector('.CodeMirror').CodeMirror !== undefined && document.querySelector('.CodeMirror').CodeMirror.getValue().length;")
        except StaleElementReferenceException:
            return False

site_url = "https://www.openprocessing.org/"
sketches_url = site_url + "user/130883#sketches"
export_path = "/home/julien/Projets/Computer-Graphics/opexport/"

driver = webdriver.Chrome("/usr/bin/chromedriver")
driver.implicitly_wait(10)
driver.get(sketches_url)

sketches_link = driver.find_elements_by_css_selector(".mainSketches a")
sketches_link_arr = []
for index, sketch_link in enumerate(sketches_link):
	url = sketch_link.get_attribute("href")
	sketches_link_arr.append(url)

for index, sketch_link in enumerate(sketches_link_arr):
	driver.get(sketch_link)
	WebDriverWait(driver, 10).until(wait_for_codeeditor_availability())
	code = driver.execute_script("return document.querySelector('.CodeMirror').CodeMirror.getValue();")

	exported_filename = str(index) + "_" + driver.title.replace(" - OpenProcessing", "").lower().replace("  ", "_").replace(" ", "_").replace("/", "")
	is_p5js = code.find("createCanvas")
	if is_p5js == -1:
		exported_filename = exported_filename + "_pjs"
	else:
		exported_filename = exported_filename + "_p5js"
	exported_filename = exported_filename + ".js"
	f = open(export_path + exported_filename, "w")
	f.write(code)
	f.close()
