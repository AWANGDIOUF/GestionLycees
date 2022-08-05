package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.PersonnelAdministratif;
import mefpai.gouv.sn.repository.PersonnelAdministratifRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.PersonnelAdministratifService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.PersonnelAdministratif}.
 */
@RestController
@RequestMapping("/api")
public class PersonnelAdministratifResource {

    private final Logger log = LoggerFactory.getLogger(PersonnelAdministratifResource.class);

    private static final String ENTITY_NAME = "personnelAdministratif";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonnelAdministratifService personnelAdministratifService;

    private final PersonnelAdministratifRepository personnelAdministratifRepository;

    public PersonnelAdministratifResource(
        PersonnelAdministratifService personnelAdministratifService,
        PersonnelAdministratifRepository personnelAdministratifRepository
    ) {
        this.personnelAdministratifService = personnelAdministratifService;
        this.personnelAdministratifRepository = personnelAdministratifRepository;
    }

    /**
     * {@code POST  /personnel-administratifs} : Create a new personnelAdministratif.
     *
     * @param personnelAdministratif the personnelAdministratif to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personnelAdministratif, or with status {@code 400 (Bad Request)} if the personnelAdministratif has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personnel-administratifs")
    public ResponseEntity<PersonnelAdministratif> createPersonnelAdministratif(
        @Valid @RequestBody PersonnelAdministratif personnelAdministratif
    ) throws URISyntaxException {
        log.debug("REST request to save PersonnelAdministratif : {}", personnelAdministratif);
        if (personnelAdministratif.getId() != null) {
            throw new BadRequestAlertException("A new personnelAdministratif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonnelAdministratif result = personnelAdministratifService.save(personnelAdministratif);
        return ResponseEntity
            .created(new URI("/api/personnel-administratifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personnel-administratifs/:id} : Updates an existing personnelAdministratif.
     *
     * @param id the id of the personnelAdministratif to save.
     * @param personnelAdministratif the personnelAdministratif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personnelAdministratif,
     * or with status {@code 400 (Bad Request)} if the personnelAdministratif is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personnelAdministratif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personnel-administratifs/{id}")
    public ResponseEntity<PersonnelAdministratif> updatePersonnelAdministratif(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PersonnelAdministratif personnelAdministratif
    ) throws URISyntaxException {
        log.debug("REST request to update PersonnelAdministratif : {}, {}", id, personnelAdministratif);
        if (personnelAdministratif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personnelAdministratif.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personnelAdministratifRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PersonnelAdministratif result = personnelAdministratifService.save(personnelAdministratif);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, personnelAdministratif.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /personnel-administratifs/:id} : Partial updates given fields of an existing personnelAdministratif, field will ignore if it is null
     *
     * @param id the id of the personnelAdministratif to save.
     * @param personnelAdministratif the personnelAdministratif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personnelAdministratif,
     * or with status {@code 400 (Bad Request)} if the personnelAdministratif is not valid,
     * or with status {@code 404 (Not Found)} if the personnelAdministratif is not found,
     * or with status {@code 500 (Internal Server Error)} if the personnelAdministratif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/personnel-administratifs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PersonnelAdministratif> partialUpdatePersonnelAdministratif(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PersonnelAdministratif personnelAdministratif
    ) throws URISyntaxException {
        log.debug("REST request to partial update PersonnelAdministratif partially : {}, {}", id, personnelAdministratif);
        if (personnelAdministratif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personnelAdministratif.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personnelAdministratifRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PersonnelAdministratif> result = personnelAdministratifService.partialUpdate(personnelAdministratif);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, personnelAdministratif.getId().toString())
        );
    }

    /**
     * {@code GET  /personnel-administratifs} : get all the personnelAdministratifs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personnelAdministratifs in body.
     */
    @GetMapping("/personnel-administratifs")
    public ResponseEntity<List<PersonnelAdministratif>> getAllPersonnelAdministratifs(Pageable pageable) {
        log.debug("REST request to get a page of PersonnelAdministratifs");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<PersonnelAdministratif> page = personnelAdministratifService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (personnelAdministratifService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((personnelAdministratifRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /personnel-administratifs/:id} : get the "id" personnelAdministratif.
     *
     * @param id the id of the personnelAdministratif to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personnelAdministratif, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personnel-administratifs/{id}")
    public ResponseEntity<PersonnelAdministratif> getPersonnelAdministratif(@PathVariable Long id) {
        log.debug("REST request to get PersonnelAdministratif : {}", id);
        Optional<PersonnelAdministratif> personnelAdministratif = personnelAdministratifService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personnelAdministratif);
    }

    /**
     * {@code DELETE  /personnel-administratifs/:id} : delete the "id" personnelAdministratif.
     *
     * @param id the id of the personnelAdministratif to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personnel-administratifs/{id}")
    public ResponseEntity<Void> deletePersonnelAdministratif(@PathVariable Long id) {
        log.debug("REST request to delete PersonnelAdministratif : {}", id);
        personnelAdministratifService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
