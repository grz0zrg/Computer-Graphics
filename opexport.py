# save all https://www.openprocessing.org/ user sketches

# for high number of sketches this may not work due to infinite scrolling on the sketches page 
# can be solved by passing the total number of sketches as first argument
# then the script will block until all sketchs link are found (it will check and report regurarly)
# to help the script find all sketches link the user must increase the browser window height manually (generally just maximize work good enough) and try to go up/down the page (generally middle page)
# once the script find all sketches the automated export begin

import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class wait_for_codeeditor_availability(object):
    def __call__(self, driver):
        try:
            return driver.execute_script("return document.querySelector('.CodeMirror').CodeMirror !== undefined && document.querySelector('.CodeMirror').CodeMirror.getValue().length;")
        except StaleElementReferenceException:
            return False

sketch_number = None
if (len(sys.argv) - 1) > 0:
	sketch_number = sys.argv[1]

url_parameters = ""
if sketch_number is not None:
	url_parameters = "?o=" + sketch_number

site_url = "https://www.openprocessing.org/"
sketches_url = site_url + "user/130883" + url_parameters + "&view=sketches#sketches"
export_path = "/home/julien/Projets/Computer-Graphics/opexport/"

print("Going to : ", sketches_url)

driver = webdriver.Chrome("/usr/bin/chromedriver")
driver.implicitly_wait(10)
driver.get(sketches_url)

sketches_link = driver.find_elements_by_css_selector(".mainSketches a")

if sketch_number is not None:
	while len(sketches_link) != int(sketch_number):
		sketches_link = driver.find_elements_by_css_selector(".mainSketches a")
		print("Sketches so far (try to scroll down/up): ", len(sketches_link))

print("Total sketches to download:", len(sketches_link))

sketches_link_arr = []
for index, sketch_link in enumerate(sketches_link):
	url = sketch_link.get_attribute("href")
	sketches_link_arr.append(url)

for index, sketch_link in enumerate(sketches_link_arr):
	driver.get(sketch_link)
	WebDriverWait(driver, 10).until(wait_for_codeeditor_availability())
	code = driver.execute_script("return document.querySelector('.CodeMirror').CodeMirror.getValue();")

	print("sketch ", str(index), " ...")

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

print("Done.")