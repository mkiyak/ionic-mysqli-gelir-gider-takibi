<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credential: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('Content-Type: application/json; charset=utf-8');

include("config.php");

$postJson = json_decode(file_get_contents("php://input"), true);
$today = date("Y-m-d H:i:s");

if($postJson['action'] == "registration_progress") {
	$emailcheck = mysqli_fetch_array(mysqli_query($mysqli,"SELECT email FROM users WHERE email = '$postJson[email]'"));

	if($emailcheck["email"] == $postJson["email"]){
		// Email Already Registered : E-posta zaten kayıtlı
		$result = json_encode(array("success" => false, 'msg' => 'E-posta zaten kayıtlı')); 
	} else {
		$password = md5($postJson['password']);
		$insert = mysqli_query($mysqli, "INSERT INTO users(fullname, gender, datebirth, email, password, createdat) 
			VALUES(
				'$postJson[fullname]',
				'$postJson[gender]',
				'$postJson[datebirth]',
				'$postJson[email]',
				'$password',
				'$today'
			) ");
		if($insert) {
			$result = json_encode(array("success" => true, "msg" => 'Başarılı Kayıt'));
		} else {
			$result = json_encode(array("success" => false, "msg" => 'Başarısız Kayıt'));
		}
		echo $result;
	}
} else if($postJson['action'] == 'login_progress'){
	$password = md5($postJson["password"]);
	$loginData = mysqli_fetch_array(mysqli_query($mysqli,"SELECT * FROM users WHERE email = '$postJson[email]' AND password = '$password'"));

	$data = array(
		'user_id' => $loginData['user_id'],
		'fullname' => $loginData['fullname'],
		'gender' => $loginData['gender'],
		'datebirth' => $loginData['datebirth'],
		'email' => $loginData['email']
	);

	if($loginData) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'load_users'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT * FROM users ORDER BY user_id DESC LIMIT $postJson[start],$postJson[limit]");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'user_id' => $row["user_id"],
			'fullname' => $row["fullname"],
			'gender' => $row["gender"],
			'datebirth' => $row["datebirth"],
			'email' => $row["email"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'delete_user'){
	$data = array();

	$query = mysqli_query($mysqli,"DELETE FROM users WHERE user_id = '$postJson[id]'");

	if($query) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'kullanici_bilgileri'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT * FROM users WHERE user_id='$postJson[id]'");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'fullname' => $row["fullname"],
			'gender' => $row["gender"],
			'datebirth' => $row["datebirth"],
			'email' => $row["email"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'crud_progress'){
	
	$password = md5($postJson['password']);
	$passcheck = mysqli_fetch_array(mysqli_query($mysqli,"SELECT * FROM users WHERE user_id = '$postJson[id]'"));

	if($postJson["password"] == ""){
		$password = $passcheck["password"];
	} else {
		$password = md5($postJson['password']);
	}

	if($postJson["crudAct"] == "Create"){
		$emailcheck = mysqli_fetch_array(mysqli_query($mysqli,"SELECT email FROM users WHERE email = '$postJson[email]'"));
			if($emailcheck["email"] == $postJson["email"]){
			// Email Already Registered : E-posta zaten kayıtlı
			$result = json_encode(array("success" => false, 'msg' => 'E-posta zaten kayıtlı')); 
		} else {
			$password = md5($postJson['password']);
			$insert = mysqli_query($mysqli, "INSERT INTO users(fullname, gender, datebirth, email, password, createdat) 
				VALUES(
					'$postJson[fullname]',
					'$postJson[gender]',
					'$postJson[datebirth]',
					'$postJson[email]',
					'$password',
					'$today'
				) ");
			if($insert) {
				$result = json_encode(array("success" => true, "msg" => 'Başarılı Kayıt'));
			} else {
				$result = json_encode(array("success" => false, "msg" => 'Başarısız Kayıt'));
			}
			echo $result;
		}
	} else if ($postJson["crudAct"] == "Update"){
		$Update = mysqli_query($mysqli, "UPDATE users SET 
			fullname = '$postJson[fullname]', 
			gender = '$postJson[gender]', 
			email = '$postJson[email]',
			datebirth = '$postJson[datebirth]',
			password = '$password' WHERE user_id='$postJson[id]'");

		if($Update) {
			$result = json_encode(array("success" => true, "msg" => 'Güncelleme Başarılı'));
		} else {
			$result = json_encode(array("success" => false, "msg" => 'İşlem Başarısız'));
		}
		echo $result;
	}
}


else if($postJson['action'] == 'kategori_listesi'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT * FROM category ORDER BY category_name ASC ");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'category_id' => $row["category_id"],
			'category_name' => $row["category_name"],
			'create_date' => $row["create_date"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'kategori_bilgileri'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT * FROM category WHERE category_id='$postJson[id]'");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'category_name' => $row["category_name"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'kategori_edit'){
	if($postJson["crudAct"] == "Create"){
		$categorycheck = mysqli_fetch_array(mysqli_query($mysqli,"SELECT category_name FROM category WHERE category_name = '$postJson[category_name]'"));
			if($categorycheck["category_name"] == $postJson["category_name"]){
			$result = json_encode(array("success" => false, 'msg' => 'Kategori zaten kayıtlı')); 
		} else {
			$insert = mysqli_query($mysqli, "INSERT INTO category (category_name) VALUES('$postJson[category_name]') ");
			if($insert) {
				$result = json_encode(array("success" => true, "msg" => 'Başarılı Kayıt'));
			} else {
				$result = json_encode(array("success" => false, "msg" => 'Başarısız Kayıt'));
			}
			echo $result;
		}
	} else if ($postJson["crudAct"] == "Update"){
		$Update = mysqli_query($mysqli, "UPDATE category SET category_name = '$postJson[category_name]' WHERE category_id='$postJson[id]'");
		if($Update) {
			$result = json_encode(array("success" => true, "msg" => 'Güncelleme Başarılı'));
		} else {
			$result = json_encode(array("success" => false, "msg" => 'İşlem Başarısız'));
		}
		echo $result;
	}
}

else if($postJson['action'] == 'gelir_gider_listesi'){
	$data = array();

	if($postJson["islem"] == "gelir") $islem_tipi = 1;
	if($postJson["islem"] == "gider") $islem_tipi = 0;

	$query = mysqli_query($mysqli,"SELECT * FROM gelir_gider_list WHERE islem_tipi='$islem_tipi' ORDER BY kayit_tarihi DESC LIMIT $postJson[start],$postJson[limit]");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'islem_id' => $row["islem_id"],
			'islem_tipi' => $row["islem_tipi"],
			'aciklama' => $row["aciklama"],
			'tutar' => $row["tutar"],
			'kayit_tarihi' => $row["kayit_tarihi"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'islem_bilgileri'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT c.category_name, u.fullname, g.* FROM gelir_gider_list g 
			LEFT JOIN users u ON u.user_id=g.user_id 
			LEFT JOIN category c ON c.category_id=g.category_id  WHERE islem_id='$postJson[id]'");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'islem_tarihi' => $row["kayit_tarihi"],
			'aciklama' => $row["aciklama"],
			'tutar' => $row["tutar"],
			'kategori_adi' => $row["category_name"],
			'kullanici_adi' => $row["fullname"],
			'islem' => $row["islem_tipi"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'islem_edit'){

	$aciklama = $postJson["aciklama"];
	$kayit_tarihi = $postJson["islem_tarihi"];
	$tutar = $postJson["tutar"];
	$category_id = $postJson["category_id"];
	$user_id = $postJson["user_id"];
	$islem = $postJson["islem"];
	if($islem == "gider") $islem_tipi = 0;
	else if($islem == "gelir") $islem_tipi = 1;
	$islem_id = $postJson["id"];

	if($postJson["crudAct"] == "Create"){
		$insert = mysqli_query($mysqli, "INSERT INTO gelir_gider_list (aciklama, tutar, kayit_tarihi, category_id, user_id, islem_tipi) 
			VALUES('$aciklama', '$tutar', '$kayit_tarihi', '$category_id', '$user_id', '$islem_tipi') ");
		if($insert) {
			$result = json_encode(array("success" => true, "msg" => 'Başarılı Kayıt'));
		} else {
			$result = json_encode(array("success" => false, "msg" => 'Başarısız Kayıt'));
		}
		echo $result;
	} else if ($postJson["crudAct"] == "Update"){
		if($category_id == "" || $category_id == 0){
			$Update = mysqli_query($mysqli, "UPDATE gelir_gider_list SET aciklama = '$aciklama', tutar = '$tutar', kayit_tarihi = '$kayit_tarihi', user_id = '$user_id' WHERE islem_id='$islem_id'");
		} else {
			$Update = mysqli_query($mysqli, "UPDATE gelir_gider_list SET aciklama = '$aciklama', tutar = '$tutar', kayit_tarihi = '$kayit_tarihi', category_id = '$category_id', user_id = '$user_id' WHERE islem_id='$islem_id'");
		}
		if($Update) {
			$result = json_encode(array("success" => true, "msg" => 'Güncelleme Başarılı'));
		} else {
			$result = json_encode(array("success" => false, "msg" => 'İşlem Başarısız'));
		}
		echo $result;
	}
} else if($postJson['action'] == 'islem_delete'){
	$data = array();

	$query = mysqli_query($mysqli,"DELETE FROM gelir_gider_list WHERE islem_id = '$postJson[id]'");

	if($query) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
} else if($postJson['action'] == 'islem_bilgileri'){
	$data = array();

	$query = mysqli_query($mysqli,"SELECT * FROM gelir_gider_list WHERE islem_id='$postJson[id]'");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = array(
			'aciklama' => $row["aciklama"],
			'islem_tarihi' => $row["kayit_tarihi"],
			'tutar' => $row["tutar"],
			'category_id' => $row["category_id"]
		);
	}

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
}



else if($postJson['action'] == 'kazanc_hesabi'){


	$data = array();
	(float)$kazanc = 0;

	$query = mysqli_query($mysqli,"SELECT islem_tipi,tutar FROM gelir_gider_list");

	while ($row = mysqli_fetch_array($query)) {
		if($row["islem_tipi"] == 1){
			$kazanc += $row["tutar"];
		} else {
			$kazanc -= $row["tutar"];
		}
	}
	$kazanc = number_format((float)$kazanc, 2);
	$data[0] = array('toplam_kazanc' => $kazanc);

	if($query) {
		$result = json_encode(array('success' => true, 'result' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}

	echo $result;
}

